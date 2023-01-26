import { SystemAction } from "../Actions";

const initialState = {
  appLoading: true,
  systems: null,
  exams: null,
  logSystem: null,
  assignCandidate: null,
  error: null,
  newExam: {
    exam: null,
    questions: null,
    status: null,
  },
  newExamLoading: false,
};

const SystemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SystemAction.types.APP_LOADING:
      return {
        ...state,
        appLoading: action.payload,
      };

    case SystemAction.types.GET_SYSTEMS:
      return {
        ...state,
        systems: action.payload,
      };

    case SystemAction.types.GET_EXAMS:
      return {
        ...state,
        exams: action.payload,
      };

    case SystemAction.types.SYSTEM_LOGIN:
      return {
        ...state,
        logSystem: action.payload,
      };

    case SystemAction.types.SYSTEM_ASSIGN:
      return {
        ...state,
        assignCandidate: action.payload,
      };

    case SystemAction.types.SET_NEW_EXAM:
      return {
        ...state,
        newExam: action.payload,
      };

    case SystemAction.types.SET_NEW_EXAM_LOADING:
      return {
        ...state,
        newExamLoading: action.payload,
      };

    case SystemAction.types.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default SystemReducer;
