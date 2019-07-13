import { FILTER_NOTES } from '../components/Menu/constants';

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
