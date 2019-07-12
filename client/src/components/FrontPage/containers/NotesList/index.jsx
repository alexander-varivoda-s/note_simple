import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getSelectedNote, getSortedNotes } from '../../selectors';
import NotePreview from './components/NotePreview';
import Pinner from './components/Pinner';
import { pinAction, selectNoteAction, unselectNoteAction } from './actions';
import { StyledNotesList, NotesListItem } from './styles';

export default function NotesList() {
  const dispatch = useDispatch();

  const notes = useSelector(getSortedNotes);
  const selectedNote = useSelector(getSelectedNote);

  const selectedNoteId = selectedNote && selectedNote._id;

  function pinHandler(isPinned, noteId) {
    dispatch(pinAction(isPinned, noteId));
  }

  const selectNote = useCallback(
    noteToSelect => {
      if (!selectedNote || noteToSelect._id !== selectedNote._id) {
        dispatch(selectNoteAction(noteToSelect._id));
      }
    },
    [selectedNote, dispatch]
  );

  const unselectNote = useCallback(() => dispatch(unselectNoteAction()), [
    dispatch,
  ]);

  useEffect(() => {
    if (notes.length && !selectedNoteId) {
      selectNote(notes[0]);
    } else if (
      selectedNoteId &&
      notes.findIndex(n => n._id === selectedNoteId) === -1
    ) {
      unselectNote();
    }
  }, [notes, selectedNoteId, selectNote, unselectNote]);

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
