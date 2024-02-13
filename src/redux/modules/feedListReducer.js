const FEEDLIST = 'feedList/FEEDLIST';
const CHANGE_EDITDONE = 'editDone/CHANGE_EDITDONE';
const PLUS_FEEDCOUNT = 'feedCount/ PLUS_FEEDCOUNT';
const MINUS_FEEDCOUNT = 'feedCount/MINUS_FEEDCOUNT';

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

export const minusFeedCount = (payload) => {
  return {
    type: MINUS_FEEDCOUNT,
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
      return {
        ...state,
        feedList: state.feedList.map((feed) =>
          feed.id === action.payload ? { ...feed, editDone: feed.editDone } : feed
        )
      };
    case PLUS_FEEDCOUNT:
      return {
        ...state,
        feedList: state.feedList.map((feed) =>
          feed.id === action.payload ? { ...feed, feedCount: feed.feedCount + 1 } : feed
        )
      };
    case MINUS_FEEDCOUNT:
      return {
        ...state,
        feedList: state.feedList.map((feed) =>
          feed.id === action.payload ? { ...feed, feedCount: feed.feedCount - 1 } : feed
        )
      };

    default:
      return state;
  }
};
