import { error } from "../errors";

export default (store) => (next) => (action) => {
  if (action.type === error.type) {
    console.log(`Tostify: ${action.payload.message}`);
  }

  next(action);
};
