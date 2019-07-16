import { ADD_NOTE_SUCCEEDED, FETCH_DATA_SUCCEEDED } from '../constants';
import {
  PIN_SUCCEEDED,
  UNPIN_SUCCEEDED,
} from '../components/NotesList/constants';
import {
  NOTE_EDIT,
  NOTE_SAVE_SUCCEEDED,
} from '../components/NoteEditor/constants';
import {
  TAG_DELETE_SUCCEEDED,
  TAG_REQUEST_SUCCEEDED,
  UNTAG_REQUEST_SUCCEEDED,
} from '../components/TagsEditor/constants';
import {
  DELETE_NOTE_SUCCEEDED,
  MOVE_TO_TRASH_SUCCEEDED,
  RESTORE_NOTE_SUCCEEDED,
} from '../components/Toolbar/constants';

function tagsReducer(tags = [], tagId) {
  return tags.filter(tag => tag !== tagId);
}

export default function notesReducer(state = [], action) {
  switch (action.type) {
    case FETCH_DATA_SUCCEEDED: {
      return action.payload.notes;
    }

    case ADD_NOTE_SUCCEEDED: {
      const { note } = action.payload;
      return [note, ...state];
    }

    case PIN_SUCCEEDED:
    case UNPIN_SUCCEEDED:
    case NOTE_SAVE_SUCCEEDED:
    case TAG_REQUEST_SUCCEEDED:
    case UNTAG_REQUEST_SUCCEEDED:
    case MOVE_TO_TRASH_SUCCEEDED:
    case RESTORE_NOTE_SUCCEEDED: {
      const { note } = action.payload;
      const newNotes = [...state];
      const index = newNotes.findIndex(n => n._id === note._id);
      newNotes[index] = note;
      return newNotes;
    }

    case TAG_DELETE_SUCCEEDED: {
      const { tagId } = action.payload;
      const newNotes = [...state];
      for (let i = 0; i < newNotes.length; i += 1) {
        const note = newNotes[i];
        newNotes[i] = {
          ...note,
          tags: tagsReducer(note.tags, tagId),
        };
      }

      return newNotes;
    }

    case NOTE_EDIT: {
      const { noteId, text } = action.payload;
      const index = state.findIndex(n => n._id === noteId);
      if (index < 0) {
        return state;
      }

      const newState = [...state];
      newState[index] = { ...newState[index], text };
      return newState;
    }

    case DELETE_NOTE_SUCCEEDED: {
      const { deleted } = action.payload;

      return state.filter(n => n._id !== deleted);
    }

    default: {
      return state;
    }
  }
}