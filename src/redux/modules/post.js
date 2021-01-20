import { createAction, handleActions } from "redux-actions";
import {
  createRequestActionTypes,
  createPostLoadingSaga,
} from "../../lib/createRequestSaga";
import { takeLatest } from "redux-saga/effects";

// 사가 액션 타입 정의
const [POSTLOAD, POSTLOAD_SUCCESS, POSTLOAD_FAILURE] = createRequestActionTypes(
  "post/POSTLOAD"
);

// 사가 액션 생성자
export const postload = createAction(POSTLOAD, (token) => ({
  token,
}));

const initialState = {
  post: {},
  postloading: null,
};

// 사가 생성
const postloadSaga = createPostLoadingSaga(POSTLOAD);
export function* postSaga() {
  yield takeLatest(POSTLOAD, postloadSaga);
}

// 리듀서
const post = handleActions(
  {
    [POSTLOAD_SUCCESS]: (state, { payload: postloading }) => ({
      ...state,
      postloading,
    }),
    [POSTLOAD_FAILURE]: (state, { payload: postloading }) => ({
      ...state,
      postloading,
    }),
  },
  initialState
);

export default post;
