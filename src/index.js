/**
 * Custom store
 */
// import store from "./store/customStore";
// import * as actions from "./store/actions";

// store.subscribe(() => {
//   console.log("Store change", store.getState());
// });

// store.dispatch(actions.bugAdded("Bug1"));

// console.log(store.getState());

import configureStore from "./store/configureStore";
import * as actions from "./store/bugs";

const store = configureStore();

store.subscribe(() => {
  console.log("Store changed: ", store.getState());
});

store.dispatch(actions.bugAdded({ description: "Bug1" }));
store.dispatch(actions.bugResolved({ id: 1 }));
store.dispatch(actions.bugRemoved({ id: 1 }));
