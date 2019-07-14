import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { noteEditAction, noteSaveAction } from './actions';
import { getSelectedNote } from '../../selectors';
import { getRevisionSelectorVisibilityStatus } from '../Revisions/selectors';
import { StyledNoteEditor, TextareaWrapper, StyledLogo } from './styles';
import SVG from '../../../Shared/components/SVG';
import TagsEditor from '../TagsEditor';

const _timeout = [];

export default function NoteEditor() {
  const _textarea = useRef(null);

  const dispatch = useDispatch();

  const note = useSelector(getSelectedNote);
  const isRevisionSelectorVisible = useSelector(
    getRevisionSelectorVisibilityStatus
  );

  function changeHandler(e) {
    dispatch(noteEditAction(e.target.value, note._id));
  }

  function keyUpHandler() {
    const { _id: noteId, text } = note;

    if (_timeout[noteId]) {
      clearTimeout(_timeout[noteId]);
      _timeout[noteId] = null;
    }

    if (!_timeout[noteId]) {
      _timeout[noteId] = setTimeout(
        () => dispatch(noteSaveAction(text, noteId)),
        750
      );
    }
  }

  return (
    <StyledNoteEditor revisionSelectorVisible={isRevisionSelectorVisible}>
      {!note ? (
        <StyledLogo>
          <SVG name='logo' size='140' color='gray' style={{ opacity: 0.2 }} />
        </StyledLogo>
      ) : (
        <>
          <TextareaWrapper>
            <textarea
              value={note.text}
              onChange={changeHandler}
              onKeyUp={keyUpHandler}
              ref={_textarea}
              spellCheck={false}
              disabled={note.is_deleted}
            />
          </TextareaWrapper>
          <TagsEditor />
        </>
      )}
    </StyledNoteEditor>
  );
}
