import { createAction, handleActions } from "redux-actions";
import {
  createRequestActionTypes,
  createPostLoadingSaga,
  createPostDeleteSage,
  createPostAddSaga,
} from "../../lib/createRequestSaga";
import { takeLatest } from "redux-saga/effects";
import produce from "immer";

// action type 정의
const CHANGE_POST_FIELD = "post/CHANGE_POST_FIELD";
const CHECK_POST_FIELD = "post/CHECK_POST_FIELD";
const INITIALIZE_POST_RADIOBOX = "post/INITIALIZE_POST_RADIOBOX";
const INITIALIZE_POST_FORM = "post/INITIALIZE_POST_FORM";

// 액션 타입 정의
const POSTOPEN = "post/POSTOPEN";
const POSTCLOSE = "post/POSTCLOSE";

// 사가 액션 타입 정의
// create action
const [POSTADD, POSTADD_SUCCESS, POSTADD_FAILURE] = createRequestActionTypes(
  "post/POSTADD"
);

// read action
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

export const postdelete = createAction(POSTDELETE, (id, posts) => ({
  id,
  posts,
}));

const initialState = {
  getpost: [],
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
  postloading: null,
  ispostopen: false,
};

// 사가 생성
// create saga 생성
const postAddSaga = createPostAddSaga(POSTADD);

// read saga 생성
const postloadSaga = createPostLoadingSaga(POSTLOAD);
const postdeleteSage = createPostDeleteSage(POSTDELETE);

export function* postSaga() {
  yield takeLatest(POSTADD, postAddSaga);
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
