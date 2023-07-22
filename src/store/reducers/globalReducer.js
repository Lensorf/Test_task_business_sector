/* eslint-disable import/prefer-default-export */
export const globalReducer = (state = [], action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_POSTS':
      return { ...state, sortedPosts: payload };
    case 'SET_SORTEDPOSTS':
      return { ...state, sortedPosts: payload };
    default:
      return state;
  }
};
