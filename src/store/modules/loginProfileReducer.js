const LOGIN_PROFILE = 'profile/login_profile';
const EDIT_PROFILE = 'profile/edit_profile';
const ESTIMATE_GOOD = 'profile/estimate_good';
const ESTIMATE_BAD = 'profile/estimate_bad';
const REMOVE_PROFILE = 'profile/remove_profile';
const SOCIAL_PROFILE = 'profile/social_profile';

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

export const estimateGood = (payload) => {
  return {
    type: ESTIMATE_GOOD,
    payload
  };
};

export const estimateBad = (payload) => {
  return {
    type: ESTIMATE_BAD,
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
    case ESTIMATE_GOOD:
      return { ...state, goodFeed: [...action.payload] };
    case ESTIMATE_BAD:
      return { ...state, badFeed: [...action.payload] };
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
