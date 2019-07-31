import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedNote } from '../../selectors';
import { revisionsAPI } from '../../../../api';
import { getNoteHistoryDateFormat } from '../../../../utils/date';
import { StyledRevisions, SelectedRevision, Range, Actions } from './styles';
import { getRevisionSelectorVisibilityStatus } from './selectors';
import { toggleRevisionSelector } from './actions';
import {
  PrimaryButton,
  SecondaryButton,
} from '../../../Shared/components/Button';
import { editNote, saveNote } from '../NoteEditor/actions';

let _currentNote = null;

export default function Revisions() {
  const _revisionSelector = useRef(null);
  const [revisions, setRevisions] = useState([]);
  const [rangePosition, setRangePosition] = useState(0);

  const note = useSelector(getSelectedNote);
  const isRevisionSelectorVisible = useSelector(
    getRevisionSelectorVisibilityStatus
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRevisions = async () => {
      const { data } = await revisionsAPI.fetchRevisions(note._id);

      setRevisions(data.revisions);
      setRangePosition(data.revisions.length);
    };

    if (isRevisionSelectorVisible) {
      fetchRevisions();
    }
  }, [note._id, isRevisionSelectorVisible]);

  useEffect(() => {
    if (
      !_currentNote ||
      _currentNote._id !== note._id ||
      _currentNote.updated !== note.updated
    ) {
      _currentNote = { ...note };
    }
  }, [note]);

  const closeSelector = useCallback(() => {
    dispatch(toggleRevisionSelector(false));
  }, [dispatch]);

  useEffect(() => {
    function documentClickHandler(e) {
      const { current } = _revisionSelector;
      if (isRevisionSelectorVisible && !current.contains(e.target)) {
        dispatch(editNote(_currentNote.text, _currentNote._id));
        closeSelector();
      }
    }
    document.addEventListener('click', documentClickHandler);

    return () => document.removeEventListener('click', documentClickHandler);
  }, [isRevisionSelectorVisible, closeSelector, dispatch]);

  function changeHandler(e) {
    const { value } = e.target;
    const pos = parseInt(value, 10);

    if (pos === revisions.length) {
      dispatch(editNote(_currentNote.text, _currentNote._id));
    }

    if (revisions[pos]) {
      dispatch(editNote(revisions[pos].text, note._id));
    }

    setRangePosition(pos);
  }

  function cancelHandler() {
    if (rangePosition !== revisions.length) {
      dispatch(editNote(_currentNote.text, note._id));
    }

    closeSelector();
  }

  function restoreNoteHandler() {
    dispatch(saveNote(note.text, note._id));
    closeSelector();
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
    <StyledRevisions
      isVisible={isRevisionSelectorVisible}
      ref={_revisionSelector}
    >
      <SelectedRevision>{revision}</SelectedRevision>
      <Range
        type='range'
        min='0'
        max={revisions.length}
        step='1'
        value={rangePosition}
        onChange={changeHandler}
      />
      <Actions>
        <SecondaryButton onClick={cancelHandler} compact>
          Cancel
        </SecondaryButton>
        <PrimaryButton
          disabled={restoreBtnDisabled}
          onClick={restoreNoteHandler}
          compact
        >
          Restore Note
        </PrimaryButton>
      </Actions>
    </StyledRevisions>
  );
}
