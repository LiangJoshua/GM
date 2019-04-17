import { combineReducers } from "redux";
import { SET_TABS, TABS } from "../actions";

function setTabs(state = TABS.HOME, action) {
  switch (action.type) {
    case SET_TABS:
      return action.tab;
    default:
      return state;
  }
}

const gmApp = combineReducers({
  setTabs
});

export default gmApp;
