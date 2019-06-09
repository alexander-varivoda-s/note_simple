import {
  NOTE_SELECTED,
  NOTE_UNSELECTED,
} from '../containers/NotesList/constants';
import { MOVE_TO_TRASH_SUCCEEDED } from '../containers/Toolbar/constants';

export default function notesReducer(state = null, action) {
  switch (action.type) {
    case NOTE_SELECTED: {
      return action.payload.noteId;
    }

    case NOTE_UNSELECTED:
    case MOVE_TO_TRASH_SUCCEEDED: {
      return null;
    }

    default: {
      return state;
    }
  }
}
