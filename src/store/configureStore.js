import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";
import tost from "./middleware/tost";

export default () =>
  configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), logger("Console"), tost],
  });
