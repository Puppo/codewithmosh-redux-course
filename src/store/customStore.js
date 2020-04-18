import reducer from "./reducer";

function createStore(reducer) {
  let state;
  let listeners = [];

  function dispatch(action) {
    state = reducer(state, action);
    for (const listener of listeners) {
      listener();
    }
  }

  function getState() {
    return state;
  }

  function subscribe(listener) {
    listeners.push(listener);
  }

  return {
    dispatch,
    getState,
    subscribe,
  };
}

export default createStore(reducer);
