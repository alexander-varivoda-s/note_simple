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

export const Highlight = styled.span`
  color: #fff;
  background-color: ${props => props.theme.palette.main};
  border-radius: 2px;
`;

function formatString(str, ch = '\u00A0', maxLen = 200) {
  if (!str.length) return ch;

  return str
    .substring(0, maxLen)
    .replace(/^(\s+)/, (match, whitespaces) => ch.repeat(whitespaces.length));
}

function generatePreview(note, lines, textToHighlight) {
  const nbsp = '\u00A0';
  const previews = [];
  const parts = note.text.split('\n', lines + 1);
  let regex = null;

  if (textToHighlight) {
    regex = new RegExp(`(${textToHighlight})`);
  }

  for (let i = 0; i <= lines; i += 1) {
    let preview =
      typeof parts[i] === 'undefined' ? nbsp : formatString(parts[i]);

    if (regex && regex.test(textToHighlight)) {
      const previewParts = preview.split(regex);
      previewParts[previewParts.indexOf(textToHighlight)] = (
        <Highlight key={`${note._id}-${i}`}>{textToHighlight}</Highlight>
      );
      preview = previewParts;
    }
    previews.push(preview);
  }

  return previews;
}

function performNoteSelect(action, id) {
  return () => action(id);
}

export default function NotePreview(props) {
  const { note, previewLines, selectNote, highlight } = props;
  const nbsp = '\u00A0';

  const preview = generatePreview(note, previewLines, highlight);

  let title = preview.shift();
  if (title === nbsp) title = 'New Note...';

  return (
    <StyledNotePreview onClick={performNoteSelect(selectNote, note._id)}>
      <div>{title}</div>
      {preview.map((part, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <p key={i}>{part}</p>
      ))}
    </StyledNotePreview>
  );
}

NotePreview.defaultProps = {
  previewLines: 2,
  highlight: '',
};

NotePreview.propTypes = {
  note: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  selectNote: PropTypes.func.isRequired,
  previewLines: PropTypes.oneOf([0, 1, 2, 3, 4]),
  highlight: PropTypes.string,
};
