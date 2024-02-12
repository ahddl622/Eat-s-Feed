const CONTENT = 'content/CONTENT';

export const myContent = (payload) => {
  return {
    type: CONTENT,
    payload
  };
};

const initialState = {
  content: ''
};

export const contentReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTENT:
      return {
        content: action.payload
      };
    default:
      return state;
  }
};
