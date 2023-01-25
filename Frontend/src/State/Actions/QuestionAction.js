import axios from "axios";
const types = {
  GET_QUESTION: "GET_QUESTION",
  SET_ANSWER: "SET_ANSWER",
  SET_ERROR: "SET_ERROR",
  SET_ACTIVE_QUESTION: "SET_ACTIVE_QUESTION",
  SUBMIT_ANSWER: "SUBMIT_ANSWER",
};

const getQuestion = (exam) => async (dispatch) => {
  try {
    const questionsResponse = await axios.get("/api/v1/questions?exam=" + exam);
    let answers = [];
    questionsResponse.data.questions.map((e) =>
      answers.push({ question: e._id, answer: null, status: "not_visited" })
    );

    if (questionsResponse) {
      await dispatch(
        setActiveQuestion(questionsResponse.data.questions[0]._id, 0)
      );
    }

    dispatch({
      type: types.GET_QUESTION,
      payload: {
        questions: questionsResponse.data.questions,
        answers: answers,
      },
    });
  } catch (error) {
    console.log(error.response.data.message);
  }
};

const setAnswer = (index, question, answer, status) => async (dispatch) => {
  dispatch({
    type: types.SET_ANSWER,
    payload: { index, question, answer, status },
  });
  console.log("Dispatched", index, question, answer, status);
};

const setActiveQuestion = (questionId, index) => async (dispatch) => {
  dispatch({
    type: types.SET_ACTIVE_QUESTION,
    payload: { question: questionId, index: index },
  });
};

const submitAnswer = (exam, candidate, answered) => async (dispatch) => {
  try {
    const submitRes = await axios.post("/api/v1/answer/submit", {
      exam,
      candidate,
      answered,
    });
    if (submitRes) {
      await localStorage.removeItem("assignCandidateToken");
      await localStorage.removeItem("assignCandidate");
      dispatch({
        type: types.SUBMIT_ANSWER,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export default {
  getQuestion,
  setAnswer,
  setActiveQuestion,
  submitAnswer,
  types,
};
