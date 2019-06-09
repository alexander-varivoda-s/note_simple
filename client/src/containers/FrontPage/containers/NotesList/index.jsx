import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getNotes, getSelectedNoteId } from '../../selectors';
import NotesListItem from './components/NotesListItem';
import NotePreview from './components/NotePreview';
import Pinner from './components/Pinner';
import { pinAction, selectNoteAction } from './actions';

const StyledNotesList = styled.div`
  border-right: 1px solid ${props => props.theme.palette.borderColor};
  flex: 1 1 auto;
  overflow-y: scroll;
  width: 100%;
`;

function NotesList(props) {
  const { selectedNoteId, notes, togglePin, handleSelect } = props;

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
            <NotePreview selectNote={handleSelect} note={note} />
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
  handleSelect: PropTypes.func.isRequired,
  selectedNoteId: PropTypes.string,
};

const mapStateToProps = state => ({
  notes: getNotes(state),
  selectedNoteId: getSelectedNoteId(state),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mergeProps = (stateProps, { dispatch }) => ({
  ...stateProps,
  togglePin: (isPinned = false, id) => dispatch(pinAction(isPinned, id)),
  handleSelect: noteId => {
    if (!stateProps.selectedNoteId || noteId !== stateProps.selectedNoteId) {
      dispatch(selectNoteAction(noteId));
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(NotesList);
