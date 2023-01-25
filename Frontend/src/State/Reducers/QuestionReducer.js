import { QuestionAction } from "../Actions";

const initialState = {
  exam: null,
  questions: null,
  answers: null,
  activeQuestion: { question: null, index: 0 },
  isSubmit: false,
};

const QuestionReducer = (state = initialState, action) => {
  switch (action.type) {
    case QuestionAction.types.GET_QUESTION:
      return {
        ...state,
        questions: action.payload.questions,
        answers: action.payload.answers,
      };

    case QuestionAction.types.SET_ANSWER:
      //state.answers.push(action.payload);
      console.log(action.payload);
      state.answers[action.payload.index] = {
        question: action.payload.question,
        answer: action.payload.answer,
        status: action.payload.status,
      };
      return state;

    case QuestionAction.types.SET_ACTIVE_QUESTION:
      return {
        ...state,
        activeQuestion: action.payload,
      };

    case QuestionAction.types.SUBMIT_ANSWER:
      return {
        ...state,
        isSubmit: true,
      };

    default:
      return state;
  }
};

export default QuestionReducer;
