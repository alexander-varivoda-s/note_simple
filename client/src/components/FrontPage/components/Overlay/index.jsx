import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyledOverlay } from './styles';
import {
  getMenuVisibilityStatus,
  getNoteInfoVisibilityStatus,
} from '../../selectors';
import { toggleMenuVisibilityAction } from '../../containers/Menu/actions';
import { toggleNoteVisibilityAction } from '../../containers/Toolbar/actions';

function Overlay(props) {
  const { isMenuVisible, isNoteInfoVisible, handleOverlayClick } = props;
  if (isMenuVisible || isNoteInfoVisible) {
    return <StyledOverlay onClick={handleOverlayClick} />;
  }

  return null;
}

Overlay.propTypes = {
  isMenuVisible: PropTypes.bool.isRequired,
  isNoteInfoVisible: PropTypes.bool.isRequired,
  handleOverlayClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isMenuVisible: getMenuVisibilityStatus(state),
  isNoteInfoVisible: getNoteInfoVisibilityStatus(state),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  handleOverlayClick: () => {
    const { isMenuVisible, isNoteInfoVisible } = stateProps;
    const { dispatch } = dispatchProps;

    if (isMenuVisible) {
      dispatch(toggleMenuVisibilityAction(!isMenuVisible));
    } else if (isNoteInfoVisible) {
      dispatch(toggleNoteVisibilityAction(!isNoteInfoVisible));
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Overlay);
