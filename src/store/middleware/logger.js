export default (params) => ({ getState }) => (next) => (action) => {
  // console.log("Logger", params);
  // console.groupCollapsed(`Receive action ${action.type}`);
  // console.log("Action: ", action);
  // console.log("State: ", getState());
  // console.groupEnd();
  return next(action);
};
