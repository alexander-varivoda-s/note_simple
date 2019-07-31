import { handleActions, combineActions } from 'redux-actions';

const initialState = {
  sorting: {
    by: 'modified',
    order: 'desc',
  },
  previewLines: 1,
  tabKeyBehavior: true,
};

export default handleActions(
  {
    [combineActions(
      'UPDATE_SETTINGS_SUCCEEDED',
      'APP_INITIALIZATION_SUCCEEDED'
    )]: (state, { payload: { settings } }) => ({
      ...state,
      ...settings,
    }),
  },
  initialState
);
