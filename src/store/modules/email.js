const SET_EMAIL = 'SET_EMAIL'

export const setEmail = (email) => {
  return {
    type: SET_EMAIL,
    payload: email,
  }
}

const initialState = ""

const email = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMAIL:
      const newEmail = action.payload;
      return newEmail
    default:
      return state;
  }
};

export default email;
