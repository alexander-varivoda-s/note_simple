import { FILTER_NOTES } from '../containers/Menu/constants';

export default function filterReducer(state = 'all', action) {
  switch (action.type) {
    case FILTER_NOTES: {
      return action.payload.filter;
    }

    default: {
      return state;
    }
  }
}
