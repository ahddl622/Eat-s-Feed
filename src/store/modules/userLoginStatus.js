const SET_LOGIN_STATUS = "SET_LOGIN_STATUS"

export const setLoginStatus = (payload) => {
  return {
    type: SET_LOGIN_STATUS,
    payload
  }
}

const initialState = {
  isLogin: false
}

const userLoginStatus = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_STATUS:
      return action.payload;
    default:
      return state;
  }
};

export default userLoginStatus