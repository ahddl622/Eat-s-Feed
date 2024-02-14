const ADD_URL = 'url/ADD_URL';

export const addUrl = (payload) => {
  return {
    type: ADD_URL,
    payload
  };
};

const initialstate = '';

export const imgURLReducer = (state = initialstate, action) => {
  switch (action.type) {
    case ADD_URL:
      return action.payload;
    default:
      return state;
  }
};
