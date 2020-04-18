import { createSlice } from "@reduxjs/toolkit";

let lastIndex = 0;

const slice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    projectAdd: (projects, action) => {
      projects.push({
        id: ++lastIndex,
        name: action.payload.name,
      });
    },
  },
});

export const { projectAdd } = slice.actions;
export default slice.reducer;
