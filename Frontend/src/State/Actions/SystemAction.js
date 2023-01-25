import axios from "axios";
import AdminAction from "./AdminAction";
const types = {
  GET_SYSTEMS: "GET_SYSTEMS",
  GET_EXAMS: "GET_EXAMS",
  SYSTEM_LOGIN: "SYSTEM_LOGIN",
  SYSTEM_ASSIGN: "SYSTEM_ASSIGN",
  SET_ERROR: "SET_ERROR",
  SET_NEW_EXAM: "SET_NEW_EXAM",
  SET_NEW_EXAM_LOADING: "SET_NEW_EXAM_LOADING",
};

const appStart = () => async (dispatch) => {
  await dispatch(getAllExams());
  const token = await localStorage.getItem("token");
  const system = await localStorage.getItem("system");
  const assignCandidate = await localStorage.getItem("assignCandidate");
  const adminToken = await localStorage.getItem("admin_token");
  if (token) {
    await dispatch({
      type: types.SYSTEM_LOGIN,
      payload: JSON.parse(system),
    });
  } else {
    dispatch(getSystems());
  }

  if (assignCandidate) {
    await dispatch({
      type: types.SYSTEM_ASSIGN,
      payload: JSON.parse(assignCandidate),
    });
  }

  if (adminToken) {
    console.log("Admin Logged in");
    try {
      const isValidAdminToken = await AdminAction.verifyToken(adminToken);
      if (isValidAdminToken) {
        dispatch({
          type: AdminAction.types.ADMIN_LOGIN,
          payload: isValidAdminToken.admin,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const getSystems = () => async (dispatch) => {
  try {
    const systemRes = await axios.get("/api/v1/systems");
    dispatch({
      type: types.GET_SYSTEMS,
      payload: systemRes.data.systems,
    });
  } catch (error) {
    dispatch({
      type: types.SET_ERROR,
      payload: error.response.data.message,
    });
  }
};

const getAllExams = () => async (dispatch) => {
  try {
    const examRes = await axios.get("/api/v1/exams");
    dispatch({
      type: types.GET_EXAMS,
      payload: examRes.data.exams,
    });
  } catch (error) {
    dispatch({
      type: types.SET_ERROR,
      payload: error.response.data.message,
    });
  }
};

const createExam = (title, date, question) => async (dispatch) => {
  if (!title) {
    dispatch({
      type: types.SET_ERROR,
      payload: "Please enter exam title",
    });
    return;
  }

  if (!date) {
    dispatch({
      type: types.SET_ERROR,
      payload: "Please enter exam date",
    });
    return;
  }

  try {
    await dispatch({
      type: types.SET_NEW_EXAM_LOADING,
      payload: true,
    });

    const examRes = await axios.post("/api/v1/exam/new", {
      title,
      date,
    });
    await dispatch({
      type: types.SET_NEW_EXAM,
      payload: {
        exam: examRes.data.exam,
        questions: null,
        status: "Exam Saved. Uploading question....",
      },
    });

    for (const q of question) {
      let data = { ...q, exam: examRes.data.exam._id };
      await dispatch(uploadQuestion(data));
    }

    await dispatch({
      type: types.SET_NEW_EXAM_LOADING,
      payload: false,
    });

    await dispatch(getAllExams());
  } catch (error) {
    dispatch({
      type: types.SET_ERROR,
      payload: error.response.data.message,
    });
  }
};

const uploadQuestion = (data, exam) => async (dispatch) => {
  console.log("received Q:", data);
  try {
    const questionsResponse = await axios.post("/api/v1/question", data);

    dispatch({
      type: types.SET_NEW_EXAM,
      payload: {
        exam: exam,
        questions: questionsResponse,
        status: "Qustion-" + data.title.english + " is Uploaded",
      },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

const systemLogin = (id, password) => async (dispatch) => {
  if (!id) {
    dispatch({
      type: types.SET_ERROR,
      payload: "Please select System.",
    });
    return;
  }

  if (!password) {
    dispatch({
      type: types.SET_ERROR,
      payload: "Please enter password.",
    });
    return;
  }

  try {
    const loginRes = await axios.post("/api/v1/system/login", { id, password });
    localStorage.setItem("token", loginRes.data.token);
    localStorage.setItem("system", JSON.stringify(loginRes.data.system));
    dispatch({
      type: types.SYSTEM_LOGIN,
      payload: loginRes.data.system,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.SET_ERROR,
      payload: error.response.data.message,
    });
  }
};

const assignSystem = (candidate) => async (dispatch) => {
  try {
    localStorage.setItem("assignCandidate", JSON.stringify(candidate));
    dispatch({
      type: types.SYSTEM_ASSIGN,
      payload: { candidate },
    });
  } catch (error) {
    dispatch({
      type: types.SET_ERROR,
      payload: "Something went wrong",
    });
  }
};

export default {
  appStart,
  getSystems,
  systemLogin,
  assignSystem,
  createExam,
  types,
};
