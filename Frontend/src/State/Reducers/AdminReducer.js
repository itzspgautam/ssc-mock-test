import { AdminAction } from "../Actions";

const initialState = {
  admin: null,
  error: null,
};

const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case AdminAction.types.ADMIN_LOGIN:
      return {
        ...state,
        admin: action.payload,
      };

    case AdminAction.types.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default AdminReducer;
