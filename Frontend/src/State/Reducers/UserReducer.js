const initialState = {
  user: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TEST":
      return state;
    default:
      return state;
  }
};

export default UserReducer;
