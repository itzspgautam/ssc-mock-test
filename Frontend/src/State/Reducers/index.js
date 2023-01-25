import { combineReducers } from "redux";
import QuestionReducer from "./QuestionReducer";
import SystemReducer from "./SystemReducer";
import UserReducer from "./UserReducer";
import AdminReducer from "./AdminReducer";
import CandidateReducer from "./CandidateReducer";
const Reducers = combineReducers({
  User: UserReducer,
  Quiz: QuestionReducer,
  System: SystemReducer,
  Admin: AdminReducer,
  Candidate: CandidateReducer,
});

export default Reducers;
