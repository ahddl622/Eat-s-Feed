const ADD_URL = 'url/ADD_URL';
const RENEW_URL = 'url/RENEW_URL';

export const addUrl = (payload) => {
  return {
    type: ADD_URL,
    payload
  };
};

export const renewUrl = () => {
  return {
    type: RENEW_URL
  };
};

const initialstate = '';

export const imgURLReducer = (state = initialstate, action) => {
  switch (action.type) {
    case ADD_URL:
      return action.payload;
    case RENEW_URL:
      return state;
    default:
      return state;
  }
};
