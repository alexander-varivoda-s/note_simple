import {
  TAG_CREATE_SUCCEEDED,
  TAG_DELETE_SUCCEEDED,
} from '../components/TagsEditor/constants';
import { INITIALIZATION_SUCCEEDED } from '../../App/constants';

export default function tagsReducer(state = [], action) {
  switch (action.type) {
    case INITIALIZATION_SUCCEEDED: {
      return action.payload.tags;
    }

    case TAG_CREATE_SUCCEEDED: {
      const { tag } = action.payload;
      return [...state, tag];
    }

    case TAG_DELETE_SUCCEEDED: {
      const { tagId } = action.payload;
      return state.filter(tag => tag._id !== tagId);
    }

    default: {
      return state;
    }
  }
}
