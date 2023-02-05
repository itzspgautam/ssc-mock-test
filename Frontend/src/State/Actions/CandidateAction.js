import axios from "axios";
import { Api } from "../../Constants";
const types = {
  AVATAR_UPLOAD_REQ: "AVATAR_UPLOAD_REQ",
  AVATAR_UPLOAD: "AVATAR_UPLOAD",
  REGISTER_CANDIDATE: "REGISTER_CANDIDATE",
  UPLOAD_ERROR: "UPLOAD_ERROR",
  VOID_CANDIDATE: "VOID_CANDIDATE",
  GET_CANDIDATES: "GET_CANDIDATES",
};

//updaye avatar
const updateAvatar = (cropedAvatar) => async (dispatch) => {
  dispatch({ type: types.AVATAR_UPLOAD_REQ });

  try {
    const formData = new FormData();
    formData.append("file", cropedAvatar);
    formData.append("upload_preset", Api.CLOUDINARY_PRESET);

    const config = {
      onUploadProgress: function (progressEvent) {
        // var percentCompleted = Math.round(
        //   (progressEvent.loaded * 100) / progressEvent.total
        // );
      },
    };

    const imageUpload = await axios.post(Api.CLOUDINARY, formData, config);
    dispatch({ type: types.AVATAR_UPLOAD, payload: imageUpload });
  } catch (error) {
    dispatch({
      type: types.UPLOAD_ERROR,
      payload: { error: error.response.data.message },
    });
  }
};
const createCandidate = (data) => async (dispatch) => {
  if (!data.name) {
    dispatch({
      type: types.UPLOAD_ERROR,
      payload: "Please enter name",
    });
    return;
  }

  if (!data.birthdate) {
    dispatch({
      type: types.UPLOAD_ERROR,
      payload: "Please enter date of birth.",
    });
    return;
  }

  if (!data.exam) {
    dispatch({
      type: types.UPLOAD_ERROR,
      payload: "Please select exam to enroll",
    });
    return;
  }
  dispatch({ type: types.AVATAR_UPLOAD_REQ });
  try {
    const register = await axios.post(
      "/api/v1/admin/candidate/register",
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      }
    );
    dispatch({
      type: types.REGISTER_CANDIDATE,
      payload: register.data.candidate,
    });
    dispatch(getCandidates());
  } catch (error) {
    dispatch({
      type: types.UPLOAD_ERROR,
      payload: error.response.data.message,
    });
  }
};

const getCandidates = () => async (dispatch) => {
  try {
    const candidates = await axios.post(
      "/api/v1/admin/candidates",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      }
    );
    dispatch({
      type: types.GET_CANDIDATES,
      payload: candidates.data,
    });
  } catch (error) {
    dispatch({
      type: types.UPLOAD_ERROR,
      payload: error.response.data.message,
    });
  }
};

const voidCandidateOnState = () => async (dispatch) => {
  dispatch({ type: types.VOID_CANDIDATE });
};

const CandidateAction = {
  updateAvatar,
  createCandidate,
  voidCandidateOnState,
  getCandidates,
  types,
};

export default CandidateAction;
