import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getNoteInfoVisibilityStatus,
  getSelectedNote,
  getSidebarVisibilityStatus,
} from '../../selectors';

import SVG from '../../../../components/SVG';
import Button from '../../../../components/Button';
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
              <Button onClick={sidebarToggle}>
                <SVG name='sidebar' size='22' />
              </Button>
            </li>
            <li>
              <Button>
                <SVG name='back' size='22' />
              </Button>
            </li>
          </ToolsList>
          <ToolsList>
            <li>
              <Button onClick={revisionSelectorToggle}>
                <SVG name='revisions' size='22' />
              </Button>
            </li>
            <li>
              <Button onClick={moveToTrash}>
                <SVG name='trash' size='22' />
              </Button>
            </li>
            <li>
              <Button onClick={noteInfoToggle}>
                <SVG name='info' size='22' />
              </Button>
            </li>
            <li>
              <AccountDropdown
                email={user.email}
                items={[
                  <Link to='/settings'>Settings</Link>,
                  <Link to='/logout'>Sign Out</Link>,
                ]}
              />
            </li>
          </ToolsList>
        </>
      )}
    </StyledToolbar>
  );
}
