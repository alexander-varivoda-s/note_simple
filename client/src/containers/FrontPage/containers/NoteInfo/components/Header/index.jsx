import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Modified from '../Modified';
import Button from '../../../../../../components/Button';
import SVG from '../../../../../../components/SVG';
import { toggleNoteVisibilityAction } from '../../../Toolbar/actions';

export const StyledHeader = styled.div`
  header {
    align-items: center;
    display: flex;
    height: 3.5em;
    justify-content: space-between;
    padding: 0 1.25em;

    h2 {
      display: inline;
      font-size: 0.75rem;
      line-height: 1;
      margin: 0;
      text-transform: uppercase;
    }
  }
`;

function Header(props) {
  const { date, closeNoteInfo } = props;

  return (
    <StyledHeader>
      <header>
        <h2>Info</h2>
        <Button onClick={closeNoteInfo}>
          <SVG name='cross' size='32' />
        </Button>
      </header>
      <Modified date={date} />
    </StyledHeader>
  );
}

Header.propTypes = {
  date: PropTypes.string.isRequired,
  closeNoteInfo: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  closeNoteInfo: () => dispatch(toggleNoteVisibilityAction(false)),
});

export default connect(
  null,
  mapDispatchToProps
)(Header);
