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
import {
  bugAdded,
  bugRemoved,
  bugResolved,
  bugAssign,
  getBugsByUser,
} from "./store/bugs";
import { projectAdd } from "./store/projects";
import { userAdded } from "./store/users";

const store = configureStore();

store.dispatch(bugAdded({ description: "Bug 1" }));
store.dispatch(bugAdded({ description: "Bug 2" }));
store.dispatch(bugAdded({ description: "Bug 3" }));
store.dispatch(bugResolved({ id: 1 }));
store.dispatch(bugRemoved({ id: 1 }));

store.dispatch(userAdded({ name: "User 1" }));
store.dispatch(userAdded({ name: "User 2" }));

store.dispatch(projectAdd({ name: "Project 1" }));

store.dispatch(bugAssign({ bugId: 3, userId: 1 }));

console.log(store.getState());
console.log(getBugsByUser(1)(store.getState()));
