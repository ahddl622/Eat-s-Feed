const LOGIN_PROFILE = 'profile/login_profile';
const EDIT_PROFILE = 'profile/edit_profile';
const SOCIAL_PROFILE = 'profile/social_profile';
const REMOVE_PROFILE = 'profile/remove_profile';

export const loginProfileMaker = (payload) => {
  return {
    type: LOGIN_PROFILE,
    payload
  };
};

export const editedProfileMaker = (payload) => {
  return {
    type: EDIT_PROFILE,
    payload
  };
};

export const socialProfile = (payload) => {
  return {
    type: SOCIAL_PROFILE,
    payload
  };
};

export const removeProfile = () => {
  return {
    type: REMOVE_PROFILE
  };
};

const initialState = {};

export const loginProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PROFILE:
      return action.payload;

    case EDIT_PROFILE:
      return { ...state, nickname: action.payload.nickname, intro: action.payload.intro, taste: action.payload.taste };

    case SOCIAL_PROFILE:
      return {
        ...state,
        nickname: action.payload.socialNickname,
        email: action.payload.socialEmail
      };
    case REMOVE_PROFILE:
      return {};
    default:
      return state;
  }
};
