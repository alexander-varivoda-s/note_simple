import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getNotes } from '../../selectors';
import NotesListItem from './components/NotesListItem';
import NotePreview from './components/NotePreview';
import Pinner from './components/Pinner';
import { pinAction, selectNoteAction } from './actions';

const StyledNotesList = styled.div`
  width: 100%;

  @media(min-width: 46.875em) {
    max-width: 18.750em;
  }
`;

function NotesList(props) {
  const { notes, togglePin, handleSelect } = props;

  return (
    <StyledNotesList>
      <ul>
        {
        notes.map(note => (
          <NotesListItem key={note._id} pinned={!!note.pinned}>
            <Pinner noteId={note._id} handleChange={togglePin} isPinned={!!note.pinned} />
            <NotePreview selectNote={handleSelect} note={note} />
          </NotesListItem>
        ))
      }
      </ul>
    </StyledNotesList>
  );
}

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    updated: PropTypes.string.isRequired,
    pinned: PropTypes.string,
    author: PropTypes.string.isRequired,
    is_deleted: PropTypes.bool.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
  togglePin: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  notes: getNotes(state),
});

const mapDispatchToProps = dispatch => ({
  togglePin: (isPinned = false, id) => dispatch(pinAction(isPinned, id)),
  handleSelect: note => dispatch(selectNoteAction(note)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesList);
