import { createAction, handleActions } from "redux-actions";

import produce from "immer";
import moment, { Moment as MomentTypes } from "moment";

const DATE_CHANGE = "calendar/DATE_CHANGE";
export const changeDate = createAction(DATE_CHANGE, (date) => date);

const initialState = {
  date: moment(),
};

export default handleActions(
  {
    [DATE_CHANGE]: (state, action) => {
      return produce(state, (draft) => {
        draft.date = action.payload;
      });
    },
  },
  initialState
);
