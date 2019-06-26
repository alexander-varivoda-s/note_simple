import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSelectedNote } from '../../selectors';
import { noteEditAction, noteSaveAction } from '../NoteEditor/actions';
import { revisionsAPI } from '../../../../api';
import { getNoteHistoryDateFormat } from '../../../../utils/date';
import {
  StyledRevisions,
  SelectedRevision,
  Range,
  Actions,
  RestoreButton,
  CancelButton,
} from './styles';
import { getRevisionSelectorVisibilityStatus } from './selectors';
import { toggleRevisionSelectorVisibilityAction } from './actions';

let _currentNote = null;

function Revisions(props) {
  const {
    note,
    handleChange,
    handleSave,
    isRevisionSelectorVisible,
    hideRevisionSelector,
  } = props;
  const [revisions, setRevisions] = useState([]);
  const [rangePosition, setRangePosition] = useState(0);

  useEffect(() => {
    const fetchRevisions = async () => {
      const { data } = await revisionsAPI.fetchRevisions(note._id, {
        withCredentials: true,
      });

      setRevisions(data.revisions);
      setRangePosition(data.revisions.length);
    };

    if (isRevisionSelectorVisible) {
      fetchRevisions();
    }
  }, [note._id, isRevisionSelectorVisible]);

  useEffect(() => {
    _currentNote = { ...note };
  }, [note]);

  function performHandleChange(e) {
    const { value } = e.target;
    const pos = parseInt(value, 10);

    if (revisions[pos]) {
      handleChange(revisions[pos].text);
    }

    setRangePosition(pos);
  }

  function performHandleCancel() {
    if (rangePosition !== revisions.length) {
      handleChange(_currentNote.text, note._id);
    }

    hideRevisionSelector();
  }

  function performRestoreNote() {
    handleSave(note.text, note._id);
    hideRevisionSelector();
  }

  const restoreBtnDisabled =
    !revisions.length || revisions.length === rangePosition;

  let revision = 'Latest';

  if (revisions[rangePosition]) {
    revision = getNoteHistoryDateFormat(
      new Date(revisions[rangePosition].created)
    );
  }

  return (
    <StyledRevisions isVisible={isRevisionSelectorVisible}>
      <SelectedRevision>{revision}</SelectedRevision>
      <Range
        type='range'
        min='0'
        max={revisions.length}
        step='1'
        value={rangePosition}
        onChange={performHandleChange}
      />
      <Actions>
        <CancelButton onClick={performHandleCancel}>Cancel</CancelButton>
        <RestoreButton
          disabled={restoreBtnDisabled}
          onClick={performRestoreNote}
        >
          Restore Note
        </RestoreButton>
      </Actions>
    </StyledRevisions>
  );
}

Revisions.propTypes = {
  note: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    updated: PropTypes.string.isRequired,
    pinned: PropTypes.string,
    author: PropTypes.string.isRequired,
    is_deleted: PropTypes.bool.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  handleSave: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  isRevisionSelectorVisible: PropTypes.bool.isRequired,
  hideRevisionSelector: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  note: getSelectedNote(state),
  isRevisionSelectorVisible: getRevisionSelectorVisibilityStatus(state),
});

const mapDispatchToProps = dispatch => ({
  handleChange: text => dispatch(noteEditAction(text)),
  handleSave: (text, noteId) => dispatch(noteSaveAction(text, noteId)),
  hideRevisionSelector: () =>
    dispatch(toggleRevisionSelectorVisibilityAction(false)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Revisions);
