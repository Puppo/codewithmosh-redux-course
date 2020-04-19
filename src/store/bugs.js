import * as moment from "moment";
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
    },
    bugRemoved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list.splice(index, 1);
    },
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list.splice(index, 1, action.payload);
    },
    bugAssignedToUser: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list.splice(index, 1, action.payload);
    },
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },
    bugsFails: (bugs, action) => {
      bugs.loading = false;
    },
  },
});

const {
  bugAdded,
  bugRemoved,
  bugResolved,
  bugAssignedToUser,
  bugsReceived,
  bugsRequested,
  bugsFails,
} = slice.actions;
export default slice.reducer;

const url = "/bugs";

// action creator
export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) {
    return;
  }

  dispatch(
    apiCallBegan({
      url,
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsFails.type,
    })
  );
};

export const addBug = (bug) =>
  apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type,
  });

export const resolveBug = (id) =>
  apiCallBegan({
    url: `${url}/${id}`,
    method: "patch",
    data: {
      resolved: true,
    },
    onSuccess: bugResolved.type,
  });

export const assignBugToUser = (id, userId) =>
  apiCallBegan({
    url: `${url}/${id}`,
    method: "patch",
    data: {
      userId,
    },
    onSuccess: bugAssignedToUser.type,
  });

//
const getBugs = (state) => state.entities.bugs;

export const getUnresolvedBugs = createSelector(getBugs, (bugs) =>
  bugs.list.filter((bug) => !bug.resolved)
);

export const getBugsByUser = (userId) =>
  createSelector(getBugs, (bugs) =>
    bugs.list.filter((bug) => bug.userId === userId)
  );
