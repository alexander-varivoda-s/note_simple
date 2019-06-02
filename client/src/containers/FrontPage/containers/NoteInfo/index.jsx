import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PinToTop from './components/PinToTop';
import Header from './components/Header';

export const StyledNoteInfo = styled.div`
  border-left: 1px solid ${props => props.theme.palette.borderColor};
  height: 100%;
  left: 100%;
  position: absolute;
  top: 0;
  width: 16.75em;

  & > div:not(:first-of-type) {
    border-top: 1px solid ${props => props.theme.palette.borderColor};
  }
`;

export default function NoteInfo(props) {
  const { note } = props;

  return (
    <StyledNoteInfo>
      <Header date={note.updated} />
      <PinToTop isChecked={!!note.pinned} noteId={note._id} />
    </StyledNoteInfo>
  );
}

NoteInfo.propTypes = {
  note: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    updated: PropTypes.string.isRequired,
    pinned: PropTypes.string,
    author: PropTypes.string.isRequired,
    is_deleted: PropTypes.bool.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
