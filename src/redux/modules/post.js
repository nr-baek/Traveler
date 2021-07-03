import { createAction, handleActions } from "redux-actions";
import {
  createRequestActionTypes,
  createPostLoadingSaga,
  createPostDeleteSage,
  createPostAddSaga,
} from "../../lib/createRequestSaga";
import { takeLatest } from "redux-saga/effects";
import produce from "immer";

// event action type 정의
const CHANGE_POST_FIELD = "post/CHANGE_POST_FIELD";
const CHECK_POST_FIELD = "post/CHECK_POST_FIELD";
const CHANGE_POST_DATE = "post/CHANGE_POST_DATE";
const CHANGE_POST_DAY = "post/CHANGE_POST_DAY";
const CONTEXT_LIST = "post/CONTEXT_LIST";

// reset action type 정의
const INITIALIZE_POST_RADIOBOX = "post/INITIALIZE_POST_RADIOBOX";
const INITIALIZE_POST_FORM = "post/INITIALIZE_POST_FORM";
const INITIALIZE_POST_DESCRIPTION = "post/INITIALIZE_POST_CONTEXT";
const INITIALIZE_MYPOST = "post/INITIALIZE_MYPOST";

// saga action type 정의
const [POSTADD, POSTADD_SUCCESS, POSTADD_FAILURE] = createRequestActionTypes(
  "post/POSTADD"
);

const [POSTLOAD, POSTLOAD_SUCCESS, POSTLOAD_FAILURE] = createRequestActionTypes(
  "post/POSTLOAD"
);

const [
  POSTDELETE,
  POSTDELETE_SUCCESS,
  POSTDELETE_FAILURE,
] = createRequestActionTypes("post/POSTDELETE");

// event state action creator function
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

export const changePostDate = createAction(CHANGE_POST_DATE, (state) => state);

export const changePostDay = createAction(CHANGE_POST_DAY, (state) => state);

export const contextList = createAction(CONTEXT_LIST, (state) => state);

// reset state action creator function
export const initializePostDescription = createAction(
  INITIALIZE_POST_DESCRIPTION
);

export const initializePostRadioBox = createAction(
  INITIALIZE_POST_RADIOBOX,
  ({ setPost, type }) => ({
    setPost,
    type,
  })
);

export const initializePostForm = createAction(INITIALIZE_POST_FORM);

export const initializeMypost = createAction(INITIALIZE_MYPOST);

// create saga action creator
export const postadd = createAction(
  POSTADD,
  ({ writer, title, travelType, startDate, endDate, days, context }) => ({
    writer,
    title,
    travelType,
    startDate,
    endDate,
    days,
    context,
  }) // action
);

export const postload = createAction(POSTLOAD, (token) => ({
  token,
}));

export const postdelete = createAction(POSTDELETE, (id, posts) => ({
  id,
  posts,
}));

// initialState
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
    date: [],
    days: "",
    context: [],
  },
  postloading: false,
  ispostopen: false,
};

// CRUD saga 생성
const postAddSaga = createPostAddSaga(POSTADD); // post/POSTADD
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
    // event reducer
    [CHANGE_POST_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),

    [CHECK_POST_FIELD]: (state, { payload: { form, value, checked } }) =>
      produce(state, (draft) => {
        draft[form]["partyType"][value] = checked;
      }),

    [CHANGE_POST_DATE]: (state, action) =>
      produce(state, (draft) => {
        draft["setPost"]["date"] = action.payload;
      }),

    [CHANGE_POST_DAY]: (state, action) =>
      produce(state, (draft) => {
        draft["setPost"]["days"] = action.payload;
      }),

    [CONTEXT_LIST]: (state, action) => {
      // console.log(action);
      return produce(state, (draft) => {
        draft.setPost.context = [...draft.setPost.context, ...action.payload];
      });
    },

    // create reducer
    [POSTADD_SUCCESS]: (state, { payload: postloading }) => {
      // console.log(postloading);
      return {
        ...state,
        postloading,
      };
    },

    // { payload: postloading }
    // ({
    //   ...state,
    //   postloading,
    // }),

    [POSTADD_FAILURE]: (state, { payload: postloading }) => ({
      ...state,
      postloading,
    }),

    // read reducer
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

    // delete reducer
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

    // reset reducer
    [INITIALIZE_POST_DESCRIPTION]: (state) => {
      // console.log(state);
      return produce(state, (draft) => {
        draft.setPost.desc = "";
      });
    },

    [INITIALIZE_POST_RADIOBOX]: (state, { payload: { setPost, type } }) =>
      produce(state, (draft) => {
        draft[setPost][type] = initialState[setPost][type];
      }),

    [INITIALIZE_POST_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      postloading: false,
    }),

    [INITIALIZE_MYPOST]: (state) => ({
      ...state,
      getpost: [],
      postloading: false,
      ispostopen: false,
    }),
  },

  initialState
);
export default post;
