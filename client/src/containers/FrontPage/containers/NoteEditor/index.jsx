import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { noteEditAction, noteSaveAction } from './actions';
import TagsEditor from '../TagsEditor';
import { getSelectedNote } from '../../selectors';
import { getRevisionSelectorVisibilityStatus } from '../Revisions/selectors';
import { StyledNoteEditor, TextareaWrapper } from './styles';
import CenteredContainer from '../../../../components/CenteredContainer';
import SVG from '../../../../components/SVG';

const _timeout = [];

export default function NoteEditor() {
  const _textarea = useRef(null);

  const dispatch = useDispatch();

  const note = useSelector(getSelectedNote);
  const isRevisionSelectorVisible = useSelector(
    getRevisionSelectorVisibilityStatus
  );

  useEffect(() => {
    if (note && !note.is_deleted) {
      _textarea.current.focus();
    }
  }, [note]);

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

  if (!note) {
    return (
      <CenteredContainer>
        <SVG name='logo' />
      </CenteredContainer>
    );
  }

  return (
    <StyledNoteEditor revisionSelectorVisible={isRevisionSelectorVisible}>
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
    </StyledNoteEditor>
  );
}
