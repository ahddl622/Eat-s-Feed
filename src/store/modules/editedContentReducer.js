const EDIT_CONTENT = 'editedContent/EDIT_CONTENT';

export const editContentHandeler = (payload) => {
  return {
    type: EDIT_CONTENT,
    payload
  };
};

const initialState = {
  editedContent: ''
};

export const editedContentReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_CONTENT:
      return {
        ...state,
        editedContent: action.payload
      };
    default:
      return state;
  }
};
