const FEEDLIST = 'feedList/FEEDLIST';
const CHANGE_EDITDONE = 'editDone/CHANGE_EDITDONE';

export const makeNewFeed = (payload) => {
  return {
    type: FEEDLIST,
    payload
  };
};

export const changeEditDone = (payload) => {
  return {
    type: CHANGE_EDITDONE,
    payload
  };
};

const initialstate = {
  feedList: []
};

export const feedListReducer = (state = initialstate, action) => {
  switch (action.type) {
    case CHANGE_EDITDONE:
      const foundFeed = state.feedList.find((feed) => feed.id === action.payload);
      const restList = state.feedList.filter((feed) => feed.id !== foundFeed.id);
      return {
        ...state,
        feedList: [...restList, { ...foundFeed, editDone: !foundFeed.editDone }]
      };
    case FEEDLIST:
      return {
        ...state,
        feedList: action.payload
      };

    default:
      return state;
  }
};
