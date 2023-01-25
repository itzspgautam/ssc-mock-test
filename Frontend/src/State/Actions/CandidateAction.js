import axios from "axios";
const types = {
  AVATAR_UPLOAD_REQ: "AVATAR_UPLOAD_REQ",
  AVATAR_UPLOAD: "AVATAR_UPLOAD",
  REGISTER_CANDIDATE: "REGISTER_CANDIDATE",
  UPLOAD_ERROR: "UPLOAD_ERROR",
  VOID_CANDIDATE: "VOID_CANDIDATE",
};

//updaye avatar
const updateAvatar = (cropedAvatar) => async (dispatch) => {
  dispatch({ type: types.AVATAR_UPLOAD_REQ });

  try {
    const formData = new FormData();
    formData.append("file", cropedAvatar);
    formData.append("upload_preset", "onlineexamdesk");

    const config = {
      onUploadProgress: function (progressEvent) {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        // dispatch({
        //   type: UPDATE_AVATAR_REQUEST,
        //   payload: { status: { uploading: true, percent: percentCompleted } },
        // });
      },
    };

    const imageUpload = await axios.post(
      "https://api.cloudinary.com/v1_1/dtpspzd66/upload",
      formData,
      config
    );
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
  console.log(data);
  try {
    const register = await axios.post("/api/v1/admin/candidate/register", data);
    console.log(register);
    dispatch({
      type: types.REGISTER_CANDIDATE,
      payload: register.data.candidate,
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

export default { updateAvatar, createCandidate, voidCandidateOnState, types };
