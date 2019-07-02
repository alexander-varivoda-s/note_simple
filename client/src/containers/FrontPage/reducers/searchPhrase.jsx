import { SEARCH } from '../containers/Search/constants';

export default function search(state = '', action) {
  switch (action.type) {
    case SEARCH: {
      return action.payload.phrase;
    }

    default: {
      return state;
    }
  }
}
