import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const StyledNotePreview = styled.div`
  border-bottom: 1px solid ${props => props.theme.notesList.borderBottomColor};
  overflow: hidden;
  padding: 0.625em 0;
  width: 100%;
  
  div, p {
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  p {
    color: gray;
    font-size: 0.875em;
    margin: 0;
  }
  
  ${props => props.active && css`
    div, p {
      color: ${props.theme.palette.main};
    }
  `}
`;

function formatString(str, ch = '\u00A0', maxLen = 200) {
  if (!str.length) return ch;

  return str
    .substring(0, maxLen)
    .replace(/^(\s+)/, (match, whitespaces) => ch.repeat(whitespaces.length));
}

export default function NotePreview(props) {
  const {
    isSelected, note, previewLines, active, selectNote,
  } = props;

  function performNoteSelect() {
    selectNote(note);
  }

  const nbsp = '\u00A0';
  const previews = [];
  const parts = note.text.split('\n', previewLines + 1);

  for (let i = 0; i <= previewLines; i += 1) {
    const temp = typeof parts[i] === 'undefined' ? nbsp : formatString(parts[i]);
    previews.push(temp);
  }

  let title = previews.shift();
  if (title === nbsp) title = 'New Note...';

  return (
    <StyledNotePreview selected={isSelected} active={active} onClick={performNoteSelect}>
      <div>{title}</div>
      {/* eslint-disable-next-line react/no-array-index-key */}
      {previews.map((preview, i) => <p key={i}>{preview}</p>)}
    </StyledNotePreview>
  );
}

NotePreview.defaultProps = {
  isSelected: false,
  previewLines: 2,
  active: false,
};

NotePreview.propTypes = {
  isSelected: PropTypes.bool,
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
  selectNote: PropTypes.func.isRequired,
  previewLines: PropTypes.oneOf([0, 1, 2, 3, 4]),
  active: PropTypes.bool,
};
