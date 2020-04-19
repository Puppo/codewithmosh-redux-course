import axios from "axios";
import { apiCallBegan, apiCallSuccess, apiCallFail } from "../api";

export default ({ dispatch }) => (next) => async (action) => {
  if (action.type !== apiCallBegan.type) {
    return next(action);
  }
  const { url, method, data, onStart, onSuccess, onError } = action.payload;

  if (onStart) {
    dispatch({
      type: onStart,
    });
  }

  next(action);

  try {
    const response = await axios({
      baseURL: "http://localhost:9001/api",
      url,
      method,
      data,
    });
    dispatch(apiCallSuccess(response.data));
    if (onSuccess) {
      dispatch({
        type: onSuccess,
        payload: response.data,
      });
    }
  } catch (ex) {
    if (onError) {
      dispatch({
        type: onError,
        payload: { message: ex.message },
      });
    }
    dispatch(apiCallFail({ message: ex.message }));
  }
};
