import { ADD_NOTE_SUCCEEDED, FETCH_DATA_SUCCEEDED } from '../constants';
import {
  PIN_SUCCEEDED,
  UNPIN_SUCCEEDED,
} from '../containers/NotesList/constants';
import { NOTE_SAVE_SUCCEEDED } from '../containers/NoteEditor/constants';
import {
  TAG_DELETE_SUCCEEDED,
  TAG_REQUEST_SUCCEEDED,
  UNTAG_REQUEST_SUCCEEDED,
} from '../containers/TagsEditor/constants';

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
    case UNTAG_REQUEST_SUCCEEDED: {
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

    default: {
      return state;
    }
  }
}
