import { combineReducers } from "redux";
import auth, { authSaga } from "./auth";
import post, { postSaga } from "./post";
import { all } from "redux-saga/effects";
import loading from "./loading";

// const state = {
//   auth: {
//     register: {
//       userId: '',
//       username: '',
//       password: '',
//       passwordConfirm: '',
//     },
//     login: {
//       userId: '',
//       password: '',
//     },
//     auth: null,
//     authError: null,
//   },
//  post: null
// };

const rootReducer = combineReducers({
  auth,
  post,
  loading,
});

export function* rootSaga() {
  yield all([authSaga(), postSaga()]);
}

export default rootReducer;
