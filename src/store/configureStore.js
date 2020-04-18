import { configureStore, combineReducers } from "@reduxjs/toolkit";
import bugs from "./bugs";
import projects from "./projects";

export default () =>
  configureStore({
    reducer: combineReducers({ projects, bugs }),
  });
