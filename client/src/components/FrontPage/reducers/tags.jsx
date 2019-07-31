import { handleActions, combineActions } from 'redux-actions';

export default handleActions(
  {
    [combineActions('APP_INITIALIZATION_SUCCEEDED', 'LOGIN_SUCCEEDED')]: (
      state,
      { payload: { tags } }
    ) => tags,
    TAG_CREATION_SUCCEEDED: (state, { payload: { tag } }) => [...state, tag],
    DELETE_TAG_SUCCEEDED: (state, { payload: { tagId } }) =>
      state.filter(tag => tag._id !== tagId),
  },
  []
);
