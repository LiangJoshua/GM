/* action types */
export const SET_TABS = "SET_TABS";

export const TABS = {
  PROFILE: "PROFILE",
  DRAFTING: "DRAFTING",
  HOME: "HOME"
};

/*action creators*/
export function setTabs(tab) {
  return { type: SET_TABS, tab };
}
