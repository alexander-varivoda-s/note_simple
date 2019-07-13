import { TOGGLE_MENU_VISIBILITY } from '../components/Menu/constants';

export default function sidebarVisibilityReducer(state = false, action) {
  switch (action.type) {
    case TOGGLE_MENU_VISIBILITY: {
      const { isVisible } = action.payload;
      return isVisible;
    }

    default: {
      return state;
    }
  }
}
