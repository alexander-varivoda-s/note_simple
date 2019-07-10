import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { noteEditAction, noteSaveAction } from './actions';
import { getSelectedNote } from '../../selectors';
import { getRevisionSelectorVisibilityStatus } from '../Revisions/selectors';
import { StyledNoteEditor, TextareaWrapper, StyledLogo } from './styles';
import SVG from '../../../../components/SVG';
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
    const { value } = e.target;
    dispatch(noteEditAction(value, note._id));
  }

  function keyUpHandler() {
    const { _id: id, text } = note;
    if (_timeout[id]) {
      clearTimeout(_timeout[id]);
      _timeout[id] = null;
    }

    if (!_timeout[id]) {
      _timeout[id] = setTimeout(() => dispatch(noteSaveAction(text, id)), 750);
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
