import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getNoteInfoVisibilityStatus,
  getSelectedNote,
  getSidebarVisibilityStatus,
} from '../../selectors';

import SVG from '../../../Shared/components/SVG';
import { IconButton } from '../../../Shared/components/Button';
import {
  moveToTrashAction,
  toggleNoteVisibilityAction,
  toggleSidebarVisibilityAction,
} from './actions';
import { toggleRevisionSelectorVisibilityAction } from '../Revisions/actions';
import { getRevisionSelectorVisibilityStatus } from '../Revisions/selectors';
import AccountDropdown from '../../../AccountDropdown';
import { getUser } from '../../../User/selectors';

import { StyledToolbar, ToolsList } from './styles';

export default function Toolbar() {
  const user = useSelector(getUser);
  const selectedNote = useSelector(getSelectedNote);
  const isNoteInfoVisible = useSelector(getNoteInfoVisibilityStatus);
  const isSidebarVisible = useSelector(getSidebarVisibilityStatus);
  const isRevisionSelectorVisible = useSelector(
    getRevisionSelectorVisibilityStatus
  );

  const dispatch = useDispatch();

  function noteInfoToggle() {
    dispatch(toggleNoteVisibilityAction(!isNoteInfoVisible));
  }

  function sidebarToggle() {
    dispatch(toggleSidebarVisibilityAction(!isSidebarVisible));
  }

  function revisionSelectorToggle() {
    dispatch(
      toggleRevisionSelectorVisibilityAction(!isRevisionSelectorVisible)
    );
  }

  function moveToTrash() {
    dispatch(moveToTrashAction(selectedNote._id));
  }

  return (
    <StyledToolbar>
      {selectedNote && (
        <>
          <ToolsList>
            <li>
              <IconButton onClick={sidebarToggle}>
                <SVG name='sidebar' size='22' />
              </IconButton>
            </li>
            <li>
              <IconButton>
                <SVG name='back' size='22' />
              </IconButton>
            </li>
          </ToolsList>
          <ToolsList>
            <li>
              <IconButton onClick={revisionSelectorToggle}>
                <SVG name='revisions' size='22' />
              </IconButton>
            </li>
            <li>
              <IconButton onClick={moveToTrash}>
                <SVG name='trash' size='22' />
              </IconButton>
            </li>
            <li>
              <IconButton onClick={noteInfoToggle}>
                <SVG name='info' size='22' />
              </IconButton>
            </li>
          </ToolsList>
        </>
      )}
      <AccountDropdown
        email={user.email}
        items={[
          <Link to='/settings'>Settings</Link>,
          <Link to='/logout'>Sign Out</Link>,
        ]}
      />
    </StyledToolbar>
  );
}
