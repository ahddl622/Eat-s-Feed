const SET_USER_UID = "SET_USER_UID"

export const setUserUid = (payload) => {
  return {
    type: SET_USER_UID,
    payload
  }
}

const initialState = ""

const userUidReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_UID:
      return action.payload
    default:
      return state;
  }
};

export default userUidReducer;
