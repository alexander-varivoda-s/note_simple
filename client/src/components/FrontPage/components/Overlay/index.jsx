import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyledOverlay } from './styles';
import {
  getMenuVisibilityStatus,
  getNoteInfoVisibilityStatus,
} from '../../selectors';
import { toggleMenu } from '../Menu/actions';
import { toggleNoteInfo } from '../NoteInfo/actions';

export default function Overlay() {
  const isMenuVisible = useSelector(getMenuVisibilityStatus);
  const isNoteInfoVisible = useSelector(getNoteInfoVisibilityStatus);

  const dispatch = useDispatch();

  function overlayClickHandler() {
    if (isMenuVisible) {
      dispatch(toggleMenu(!isMenuVisible));
    } else if (isNoteInfoVisible) {
      dispatch(toggleNoteInfo(!isNoteInfoVisible));
    }
  }

  if (isMenuVisible || isNoteInfoVisible) {
    return <StyledOverlay onClick={overlayClickHandler} />;
  }

  return null;
}
