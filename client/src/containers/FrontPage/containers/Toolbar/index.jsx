import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  getNoteInfoVisibilityStatus,
  getSelectedNoteId,
} from '../../selectors';

import SVG from '../../../../components/SVG';
import Button from '../../../../components/Button';
import { toggleNoteVisibilityAction } from './actions';

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

  ul {
    display: flex;
    list-style: none;

    li {
      margin-right: 0.875em;
    }
  }
`;

function Toolbar(props) {
  const { isNoteSelected, toggleNoteInfoVisibility } = props;

  return (
    <StyledToolbar>
      {isNoteSelected && (
        <Fragment>
          <ul>
            <li>
              <Button>
                <SVG name='sidebar' size='22' />
              </Button>
            </li>
            <li>
              <Button>
                <SVG name='back' size='22' />
              </Button>
            </li>
          </ul>
          <ul>
            <li>
              <Button>
                <SVG name='revisions' size='22' />
              </Button>
            </li>
            <li>
              <Button>
                <SVG name='trash' size='22' />
              </Button>
            </li>
            <li>
              <Button onClick={toggleNoteInfoVisibility}>
                <SVG name='info' size='22' />
              </Button>
            </li>
          </ul>
        </Fragment>
      )}
    </StyledToolbar>
  );
}

Toolbar.propTypes = {
  isNoteSelected: PropTypes.bool.isRequired,
  toggleNoteInfoVisibility: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isNoteSelected: !!getSelectedNoteId(state),
  isNoteInfoVisible: getNoteInfoVisibilityStatus(state),
});

const mapDispatchToProps = dispatch => ({ dispatch });

const mergeProps = ({ isNoteSelected, isNoteInfoVisible }, { dispatch }) => ({
  isNoteSelected,
  toggleNoteInfoVisibility: () =>
    dispatch(toggleNoteVisibilityAction(!isNoteInfoVisible)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Toolbar);
