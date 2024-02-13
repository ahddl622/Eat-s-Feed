const TITLE = 'title/TITLE';

export const myTitle = (payload) => {
  return {
    type: TITLE,
    payload
  };
};

const initialState = {
  title: ''
};

export const titleReducer = (state = initialState, action) => {
  switch (action.type) {
    case TITLE:
      return {
        ...state,
        title: action.payload
      };
    default:
      return state;
  }
};
