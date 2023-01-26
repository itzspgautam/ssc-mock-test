import { CandidateAction } from "../Actions";

const initialState = {
  newCandidate: null,
  uploadedImage: null,
  uploadingImage: false,
  uploadError: null,
};

const CandidateReducer = (state = initialState, action) => {
  switch (action.type) {
    case CandidateAction.types.AVATAR_UPLOAD_REQ:
      return {
        ...state,
        uploadingImage: true,
      };

    case CandidateAction.types.AVATAR_UPLOAD:
      return {
        ...state,
        uploadedImage: action.payload,
        uploadingImage: false,
      };

    case CandidateAction.types.REGISTER_CANDIDATE:
      return {
        ...state,
        newCandidate: action.payload,
        uploadingImage: false,
      };

    case CandidateAction.types.VOID_CANDIDATE:
      return {
        newCandidate: null,
        uploadedImage: null,
        uploadingImage: false,
        uploadError: null,
      };

    case CandidateAction.types.UPLOAD_ERROR:
      return {
        ...state,
        uploadError: action.payload,
        uploadingImage: false,
      };

    default:
      return state;
  }
};

export default CandidateReducer;
