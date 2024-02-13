import { type } from "@testing-library/user-event/dist/type";

const SET_PASSWORD = "SET_PASSWORD"

export const setPassword = (password) => {
  return {
    type: SET_PASSWORD,
    payload: password
  }
}
const initialState = ""

const password = (state = initialState, action) => {
  switch (action.type) {
    case SET_PASSWORD:
      const newPassword = action.payload;
      return newPassword
    default:
      return state;
  }
};

export default password;
