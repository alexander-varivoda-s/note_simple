import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getSelectedNote, getSortedNotes } from '../../selectors';
import NotePreview from './components/NotePreview';
import Pinner from './components/Pinner';
import { pin, unpin } from './actions';
import { noteSelected, noteUnselected } from '../../../Shared/actions';
import { StyledNotesList, NotesListItem } from './styles';

export default function NotesList() {
  const dispatch = useDispatch();

  const notes = useSelector(getSortedNotes);
  const selectedNote = useSelector(getSelectedNote);

  const selectedNoteId = selectedNote && selectedNote._id;

  function pinHandler(isPinned, noteId) {
    if (!isPinned) {
      dispatch(pin(noteId));
    } else {
      dispatch(unpin(noteId));
    }
  }

  const selectNote = useCallback(
    noteToSelect => {
      if (!selectedNote || noteToSelect._id !== selectedNote._id) {
        if (selectedNote) {
          dispatch(noteUnselected());
        }
        dispatch(noteSelected(noteToSelect._id));
      }
    },
    [selectedNote, dispatch]
  );

  return (
    <StyledNotesList>
      <ul>
        {notes.map(note => (
          <NotesListItem
            key={note._id}
            pinned={!!note.pinned}
            selected={note._id === selectedNoteId}
          >
            <Pinner
              noteId={note._id}
              pinHandler={pinHandler}
              isPinned={!!note.pinned}
            />
            <NotePreview selectNoteHandler={selectNote} note={note} />
          </NotesListItem>
        ))}
      </ul>
    </StyledNotesList>
  );
}
