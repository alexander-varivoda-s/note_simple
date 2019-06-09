import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const StyledNotePreview = styled.div`
  border-bottom: 1px solid ${props => props.theme.notesList.borderBottomColor};
  overflow: hidden;
  padding: 0.625em 0;
  width: 100%;

  div,
  p {
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
`;

function formatString(str, ch = '\u00A0', maxLen = 200) {
  if (!str.length) return ch;

  return str
    .substring(0, maxLen)
    .replace(/^(\s+)/, (match, whitespaces) => ch.repeat(whitespaces.length));
}

export default function NotePreview(props) {
  const { note, previewLines, selectNote } = props;

  function performNoteSelect() {
    selectNote(note._id);
  }

  const nbsp = '\u00A0';
  const previews = [];
  const parts = note.text.split('\n', previewLines + 1);

  for (let i = 0; i <= previewLines; i += 1) {
    const temp =
      typeof parts[i] === 'undefined' ? nbsp : formatString(parts[i]);
    previews.push(temp);
  }

  let title = previews.shift();
  if (title === nbsp) title = 'New Note...';

  return (
    <StyledNotePreview onClick={performNoteSelect}>
      <div>{title}</div>
      {previews.map((preview, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <p key={i}>{preview}</p>
      ))}
    </StyledNotePreview>
  );
}

NotePreview.defaultProps = {
  previewLines: 2,
};

NotePreview.propTypes = {
  note: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  selectNote: PropTypes.func.isRequired,
  previewLines: PropTypes.oneOf([0, 1, 2, 3, 4]),
};
