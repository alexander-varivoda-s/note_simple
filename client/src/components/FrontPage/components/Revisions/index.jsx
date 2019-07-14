import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedNote } from '../../selectors';
import { noteEditAction, noteSaveAction } from '../NoteEditor/actions';
import { revisionsAPI } from '../../../../api';
import { getNoteHistoryDateFormat } from '../../../../utils/date';
import { StyledRevisions, SelectedRevision, Range, Actions } from './styles';
import { getRevisionSelectorVisibilityStatus } from './selectors';
import { toggleRevisionSelectorVisibilityAction } from './actions';
import {
  PrimaryButton,
  SecondaryButton,
} from '../../../Shared/components/Button';

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

  const closeSelector = useCallback(() => {
    dispatch(toggleRevisionSelectorVisibilityAction(false));
  }, [dispatch]);

  useEffect(() => {
    function handleDocumentClick(e) {
      if (
        isRevisionSelectorVisible &&
        !_revisionSelector.current.contains(e.target)
      ) {
        closeSelector();
      }
    }
    document.addEventListener('click', handleDocumentClick);

    return () => document.removeEventListener('click', handleDocumentClick);
  }, [isRevisionSelectorVisible, closeSelector]);

  function editNote(text, id = null) {
    dispatch(noteEditAction(text, id));
  }

  function changeHandler(e) {
    const { value } = e.target;
    const pos = parseInt(value, 10);

    if (revisions[pos]) {
      editNote(revisions[pos].text);
    }

    setRangePosition(pos);
  }

  function cancelHandler() {
    if (rangePosition !== revisions.length) {
      editNote(_currentNote.text, note._id);
    }

    closeSelector();
  }

  function restoreNoteHandler() {
    dispatch(noteSaveAction(note.text, note._id));
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
