import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
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

export const StyledToolbar = styled.div`
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.palette.borderColor};
  display: flex;
  flex: 0 0 3.5em;
  justify-content: space-between;
  padding: 0 1em;

  ${Button} {
    height: 2em;
    width: 2em;
  }
`;

const ToolsList = styled.ul`
  display: flex;

  & > li {
    margin-right: 0.875em;
  }
`;

function Toolbar(props) {
  const {
    isNoteSelected,
    toggleNoteInfoVisibility,
    moveToTrash,
    toggleSidebarVisibility,
    toggleRevisionSelectorVisibility,
    user,
  } = props;

  return (
    <StyledToolbar>
      {isNoteSelected && (
        <Fragment>
          <ToolsList>
            <li>
              <Button onClick={toggleSidebarVisibility}>
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
              <Button onClick={toggleRevisionSelectorVisibility}>
                <SVG name='revisions' size='22' />
              </Button>
            </li>
            <li>
              <Button onClick={moveToTrash}>
                <SVG name='trash' size='22' />
              </Button>
            </li>
            <li>
              <Button onClick={toggleNoteInfoVisibility}>
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
        </Fragment>
      )}
    </StyledToolbar>
  );
}

Toolbar.propTypes = {
  isNoteSelected: PropTypes.bool.isRequired,
  toggleNoteInfoVisibility: PropTypes.func.isRequired,
  moveToTrash: PropTypes.func.isRequired,
  toggleSidebarVisibility: PropTypes.func.isRequired,
  toggleRevisionSelectorVisibility: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  selectedNote: getSelectedNote(state),
  isNoteInfoVisible: getNoteInfoVisibilityStatus(state),
  isSidebarVisible: getSidebarVisibilityStatus(state),
  isRevisionSelectorVisible: getRevisionSelectorVisibilityStatus(state),
  user: getUser(state),
});

const mapDispatchToProps = dispatch => ({ dispatch });

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {
    selectedNote,
    isNoteInfoVisible,
    isSidebarVisible,
    isRevisionSelectorVisible,
  } = stateProps;
  const { dispatch } = dispatchProps;

  return {
    ...ownProps,
    user: stateProps.user,
    isNoteSelected: !!selectedNote,
    toggleNoteInfoVisibility: () =>
      dispatch(toggleNoteVisibilityAction(!isNoteInfoVisible)),
    moveToTrash: () => dispatch(moveToTrashAction(selectedNote)),
    toggleSidebarVisibility: () =>
      dispatch(toggleSidebarVisibilityAction(!isSidebarVisible)),
    toggleRevisionSelectorVisibility: () =>
      dispatch(
        toggleRevisionSelectorVisibilityAction(!isRevisionSelectorVisible)
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Toolbar);
