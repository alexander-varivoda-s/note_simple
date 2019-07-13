import { TOGGLE_SIDEBAR_VISIBILITY } from '../components/Toolbar/constants';

export default function sidebarVisibilityReducer(state = true, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR_VISIBILITY: {
      const { isVisible } = action.payload;
      return isVisible;
    }

    default: {
      return state;
    }
  }
}
