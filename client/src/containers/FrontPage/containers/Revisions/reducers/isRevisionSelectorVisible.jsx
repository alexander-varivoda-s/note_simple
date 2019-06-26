import { HIDE_REVISION_SELECTOR, SHOW_REVISION_SELECTOR } from '../constants';

export default function(state = false, action) {
  switch (action.type) {
    case SHOW_REVISION_SELECTOR: {
      return true;
    }

    case HIDE_REVISION_SELECTOR: {
      return false;
    }

    default: {
      return state;
    }
  }
}
