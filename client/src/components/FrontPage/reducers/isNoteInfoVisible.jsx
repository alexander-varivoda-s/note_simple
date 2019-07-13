import { TOGGLE_NOTE_INFO } from '../components/Toolbar/constants';

export default function noteInfoVisiblityReducer(state = false, action) {
  switch (action.type) {
    case TOGGLE_NOTE_INFO: {
      const { isVisible } = action.payload;
      return isVisible;
    }

    default: {
      return state;
    }
  }
}
