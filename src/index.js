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
import * as bugActions from "./store/bugs";
import * as projectActions from "./store/projects";

const store = configureStore();

store.subscribe(() => {
  console.log("Store changed: ", store.getState());
});

store.dispatch(bugActions.bugAdded({ description: "Bug1" }));
store.dispatch(bugActions.bugResolved({ id: 1 }));
store.dispatch(bugActions.bugRemoved({ id: 1 }));

store.dispatch(projectActions.projectAdd({ name: "Project 1" }));
