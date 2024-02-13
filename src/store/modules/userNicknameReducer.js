const SET_NICKNAME = 'SET_NICKNAME';

export const setNickname = (nickname) => {
  return {
    type: SET_NICKNAME,
    payload: nickname,
  }
};

const initialState = "";

const userNicknameReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NICKNAME:
      return action.payload;
    default:
      return state;
  }
};

export default userNicknameReducer;
