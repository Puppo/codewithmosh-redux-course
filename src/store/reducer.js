import { combineReducers } from "@reduxjs/toolkit";
import entitiesReducers from "./entities";

export default combineReducers({
  entities: entitiesReducers,
});
