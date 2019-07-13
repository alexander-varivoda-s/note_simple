import React from 'react';
import PropTypes from 'prop-types';

import { StyledPinner, Inner, Outer } from './styles';

export default function Pinner(props) {
  const { pinHandler, noteId, isPinned } = props;

  function toggle() {
    pinHandler(!isPinned, noteId);
  }

  function handleKeydown(e) {
    if (e.keyCode === 32) {
      toggle(e);
    }
  }

  return (
    <StyledPinner>
      <Outer
        role='checkbox'
        aria-checked={isPinned}
        onClick={toggle}
        tabIndex='0'
        onKeyDown={handleKeydown}
      >
        <Inner />
      </Outer>
    </StyledPinner>
  );
}

Pinner.propTypes = {
  pinHandler: PropTypes.func.isRequired,
  noteId: PropTypes.string.isRequired,
  isPinned: PropTypes.bool.isRequired,
};
