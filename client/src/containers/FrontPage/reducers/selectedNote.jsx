import {
  NOTE_SELECTED,
  NOTE_UNSELECTED,
} from '../containers/NotesList/constants';
import { NOTE_EDIT } from '../containers/NoteEditor/constants';

export default function notesReducer(state = null, action) {
  switch (action.type) {
    case NOTE_SELECTED: {
      return action.payload.note;
    }

    case NOTE_UNSELECTED: {
      return null;
    }

    case NOTE_EDIT: {
      return {
        ...state,
        text: action.payload.text,
      };
    }

    default: {
      return state;
    }
  }
}
