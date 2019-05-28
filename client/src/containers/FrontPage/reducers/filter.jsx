import { FILTER } from '../constants';

export default function filterReducer(state = 'all-notes', action) {
  switch (action.type) {
    case FILTER: {
      return action.payload.filter;
    }

    default: {
      return state;
    }
  }
}
