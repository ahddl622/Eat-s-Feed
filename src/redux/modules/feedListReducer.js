const FEEDLIST = 'feedList/FEEDLIST';
const CHANGE_EDITDONE = 'editDone/CHANGE_EDITDONE';
const PLUS_FEEDCOUNT = 'feedCount/ PLUS_FEEDCOUNT';

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

export const plusFeedCount = (payload) => {
  return {
    type: PLUS_FEEDCOUNT,
    payload
  };
};

const initialstate = {
  feedList: []
};

export const feedListReducer = (state = initialstate, action) => {
  switch (action.type) {
    case FEEDLIST:
      return {
        ...state,
        feedList: action.payload
      };
    case CHANGE_EDITDONE:
      const foundFeed = state.feedList.find((feed) => feed.id === action.payload);
      const restList = state.feedList.filter((feed) => feed.id !== foundFeed.id);
      return {
        ...state,
        feedList: [...restList, { ...foundFeed, editDone: !foundFeed.editDone }]
      };
    case PLUS_FEEDCOUNT:
      const plusFoundFeed = state.feedList.find((feed) => feed.id === action.payload);
      return {
        ...state,
        feedList: [...state.feedList, { ...plusFoundFeed, feedCount: plusFoundFeed.feedCount + 1 }]
      };

    default:
      return state;
  }
};
