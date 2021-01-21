import { createAction, handleActions } from "redux-actions";
import {
  createRequestActionTypes,
  createPostLoadingSaga,
  createPostDeleteSage,
} from "../../lib/createRequestSaga";
import { takeLatest } from "redux-saga/effects";

// 액션 타입 정의
const POSTOPEN = "post/POSTOPEN";
const POSTCLOSE = "post/POSTCLOSE";

// 사가 액션 타입 정의
const [POSTLOAD, POSTLOAD_SUCCESS, POSTLOAD_FAILURE] = createRequestActionTypes(
  "post/POSTLOAD"
);

const [
  POSTDELETE,
  POSTDELETE_SUCCESS,
  POSTDELETE_FAILURE,
] = createRequestActionTypes("post/POSTDELETE");

// 액션 생성자
export const postopen = createAction(POSTOPEN);

export const postclose = createAction(POSTCLOSE);

// 사가 액션 생성자
export const postload = createAction(POSTLOAD, (token) => ({
  token,
}));

export const postdelete = createAction(POSTDELETE, (id, posts) => ({
  id,
  posts,
}));

const initialState = {
  getpost: [],
  postloading: null,
  ispostopen: false,
};

// 사가 생성
const postloadSaga = createPostLoadingSaga(POSTLOAD);
const postdeleteSage = createPostDeleteSage(POSTDELETE);
export function* postSaga() {
  yield takeLatest(POSTLOAD, postloadSaga);
  yield takeLatest(POSTDELETE, postdeleteSage);
}

// 리듀서
const post = handleActions(
  {
    [POSTOPEN]: (state) => ({
      ...state,
      ispostopen: true,
    }),
    [POSTCLOSE]: (state) => ({
      ...state,
      ispostopen: false,
    }),
    [POSTLOAD_SUCCESS]: (state, { payload }) => ({
      ...state,
      getpost: payload.getpost,
      postloading: payload.postloading,
    }),
    [POSTLOAD_FAILURE]: (state, { payload: { getpost, postloading } }) => ({
      ...state,
      getpost,
      postloading,
    }),
    [POSTDELETE]: (state, { payload }) => ({
      ...state,
      getpost: payload.posts,
    }),
    [POSTDELETE_SUCCESS]: (state, { payload: { postloading } }) => ({
      ...state,
      postloading,
    }),
    [POSTDELETE_FAILURE]: (state, { payload: { postloading } }) => ({
      ...state,
      postloading,
    }),
  },
  initialState
);

export default post;
