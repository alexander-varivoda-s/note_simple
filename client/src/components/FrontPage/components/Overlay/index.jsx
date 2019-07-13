import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyledOverlay } from './styles';
import {
  getMenuVisibilityStatus,
  getNoteInfoVisibilityStatus,
} from '../../selectors';
import { toggleMenuVisibilityAction } from '../Menu/actions';
import { toggleNoteVisibilityAction } from '../Toolbar/actions';

export default function Overlay() {
  const isMenuVisible = useSelector(getMenuVisibilityStatus);
  const isNoteInfoVisible = useSelector(getNoteInfoVisibilityStatus);

  const dispatch = useDispatch();

  function overlayClickHandler() {
    if (isMenuVisible) {
      dispatch(toggleMenuVisibilityAction(!isMenuVisible));
    } else if (isNoteInfoVisible) {
      dispatch(toggleNoteVisibilityAction(!isNoteInfoVisible));
    }
  }

  if (isMenuVisible || isNoteInfoVisible) {
    return <StyledOverlay onClick={overlayClickHandler} />;
  }

  return null;
}
