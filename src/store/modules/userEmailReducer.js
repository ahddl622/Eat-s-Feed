const SET_EMAIL = 'SET_EMAIL';

export const setUserEmail = (payload) => {
  return {
    type: SET_EMAIL,
    payload
  }
};

const initialState = "";

const userEmailReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return action.payload;
    default:
      return state;
  }
};

export default userEmailReducer;
