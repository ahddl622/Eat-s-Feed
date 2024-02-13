const PLUS_COUNT = 'count/PLUS_COUNT';
const MINUS_COUNT = 'count/MINUS_COUNT';

export const plusCount = () => {
  return {
    type: PLUS_COUNT
  };
};

export const minusCount = () => {
  return {
    type: MINUS_COUNT
  };
};

const initialstate = 0;

export const countReducer = (state = initialstate, action) => {
  switch (action.type) {
    case PLUS_COUNT:
      return state + 1;
    case MINUS_COUNT:
      return state - 1;
    default:
      return state;
  }
};
