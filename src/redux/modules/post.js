import { createAction, handleActions } from "redux-actions";
import {
  createRequestActionTypes,
  createPostLoadingSaga,
  createPostAddSaga,
} from "../../lib/createRequestSaga";
import { takeLatest } from "redux-saga/effects";
import produce from "immer";

// action type 정의
const CHANGE_POST_FIELD = "post/CHANGE_POST_FIELD";
const CHECK_POST_FIELD = "post/CHECK_POST_FIELD";
const INITIALIZE_POST_RADIOBOX = "post/INITIALIZE_POST_RADIOBOX";
const INITIALIZE_POST_FORM = "post/INITIALIZE_POST_FORM";

// 사가 액션 타입 정의
// create action
const [POSTADD, POSTADD_SUCCESS, POSTADD_FAILURE] = createRequestActionTypes(
  "post/POSTADD"
);

// read action
const [POSTLOAD, POSTLOAD_SUCCESS, POSTLOAD_FAILURE] = createRequestActionTypes(
  "post/POSTLOAD"
);

// action creator function
export const changePostFiled = createAction(
  CHANGE_POST_FIELD,
  ({ form, key, value }) => ({
    form,
    key, // title, desc
    value, // 실제 바꾸려는 값
  })
);

export const checkPostFiled = createAction(
  CHECK_POST_FIELD,
  ({ form, value, checked }) => ({
    form,
    value, // alone, firend, family, couple
    checked, // boolean
  })
);

export const initializePostRadioBox = createAction(
  INITIALIZE_POST_RADIOBOX,
  ({ setPost, type }) => ({
    setPost,
    type,
  })
);

export const initializePostForm = createAction(INITIALIZE_POST_FORM);

// 사가 액션 생성자
// create saga action creator
export const postadd = createAction(
  POSTADD,
  ({ writer, title, desc, travelType }) => ({
    writer,
    title,
    desc,
    travelType,
  })
);

// read saga action creator
export const postload = createAction(POSTLOAD, (token) => ({
  token,
}));

const initialState = {
  setPost: {
    title: "",
    desc: "",
    partyType: {
      alone: false,
      friend: false,
      family: false,
      couple: false,
    },
  },
  getPost: {},
  postloading: null,
};

// 사가 생성
// create saga 생성
const postAddSaga = createPostAddSaga(POSTADD);

// read saga 생성
const postloadSaga = createPostLoadingSaga(POSTLOAD);

export function* postSaga() {
  yield takeLatest(POSTADD, postAddSaga);
  yield takeLatest(POSTLOAD, postloadSaga);
}

// 리듀서
const post = handleActions(
  {
    [CHANGE_POST_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [CHECK_POST_FIELD]: (state, { payload: { form, value, checked } }) =>
      produce(state, (draft) => {
        draft[form]["partyType"][value] = checked;
      }),
    [INITIALIZE_POST_RADIOBOX]: (state, { payload: { setPost, type } }) =>
      produce(state, (draft) => {
        draft[setPost][type] = initialState[setPost][type];
      }),
    [INITIALIZE_POST_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      postloading: null,
    }),
    [POSTADD_SUCCESS]: (state, { payload: postloading }) => ({
      ...state,
      postloading,
    }),
    [POSTADD_FAILURE]: (state, { payload: postloading }) => ({
      ...state,
      postloading,
    }),
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
