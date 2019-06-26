import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  getSearchPhrase,
  getSelectedNote,
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
          selectNote(note);
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
              note={note}
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
  selectedNote: getSelectedNote(state),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { selectedNote } = stateProps;
  const { dispatch } = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
    selectedNoteId: selectedNote && selectedNote._id,
    togglePin: (isPinned = false, note) => dispatch(pinAction(isPinned, note)),
    selectNote: noteToSelect => {
      if (!selectedNote || noteToSelect._id !== selectedNote._id) {
        dispatch(selectNoteAction(noteToSelect));
      }
    },
    unselectNote: () => dispatch(unselectNoteAction()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(NotesList);
