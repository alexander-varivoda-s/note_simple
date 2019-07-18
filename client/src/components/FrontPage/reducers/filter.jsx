import { FILTER_NOTES } from '../components/Menu/constants';
import { ALL_NOTES } from '../../Shared/constants';

export default function filterReducer(state = ALL_NOTES, action) {
  switch (action.type) {
    case FILTER_NOTES: {
      return action.payload.filter;
    }

    default: {
      return state;
    }
  }
}
