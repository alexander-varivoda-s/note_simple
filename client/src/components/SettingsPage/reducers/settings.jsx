import { APP_SETTINGS_UPDATE_SUCCEEDED } from '../constants';

const initialState = {
  sorting: {
    by: 'modified',
    order: 'desc',
  },
  previewLines: 1,
  tabKeyBehavior: true,
};

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case APP_SETTINGS_UPDATE_SUCCEEDED: {
      const { settings } = action.payload;
      return {
        ...state,
        ...settings,
      };
    }

    default: {
      return state;
    }
  }
}
