import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  getSearchPhrase,
  getSelectedNoteId,
  getSortedNotes,
} from '../../selectors';
import NotesListItem from './components/NotesListItem';
import NotePreview from './components/NotePreview';
import Pinner from './components/Pinner';
import { pinAction, selectNoteAction, unselectNoteAction } from './actions';

const StyledNotesList = styled.div`
  border-right: 1px solid ${props => props.theme.palette.borderColor};
  flex: 1 1 auto;
  overflow-y: scroll;
  width: 100%;
`;

function NotesList(props) {
  const {
    selectedNoteId,
    notes,
    togglePin,
    selectNote,
    unselectNote,
    searchPhrase,
  } = props;

  useEffect(
    function selectDefaultNote() {
      if (notes.length) {
        const note = notes[0];

        if (!selectedNoteId) {
          selectNote(note._id);
        }
      } else if (selectedNoteId && !searchPhrase) {
        unselectNote();
      }
    },
    [notes, selectedNoteId, selectNote, unselectNote, searchPhrase]
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
              handleChange={togglePin}
              isPinned={!!note.pinned}
            />
            <NotePreview
              selectNote={selectNote}
              note={note}
              highlight={searchPhrase}
            />
          </NotesListItem>
        ))}
      </ul>
    </StyledNotesList>
  );
}

NotesList.defaultProps = {
  selectedNoteId: null,
};

NotesList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
      updated: PropTypes.string.isRequired,
      pinned: PropTypes.string,
      author: PropTypes.string.isRequired,
      is_deleted: PropTypes.bool.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  togglePin: PropTypes.func.isRequired,
  selectNote: PropTypes.func.isRequired,
  selectedNoteId: PropTypes.string,
  unselectNote: PropTypes.func.isRequired,
  searchPhrase: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  notes: getSortedNotes(state),
  searchPhrase: getSearchPhrase(state),
  selectedNoteId: getSelectedNoteId(state),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mergeProps = (stateProps, { dispatch }) => ({
  ...stateProps,
  togglePin: (isPinned = false, id) => dispatch(pinAction(isPinned, id)),
  selectNote: noteId => {
    if (!stateProps.selectedNoteId || noteId !== stateProps.selectedNoteId) {
      dispatch(selectNoteAction(noteId));
    }
  },
  unselectNote: () => dispatch(unselectNoteAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(NotesList);
