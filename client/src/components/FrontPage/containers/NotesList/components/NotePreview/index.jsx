import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { StyledNotePreview, Highlight } from './styles';
import { getSearchPhrase } from '../../../../selectors';

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

function performNoteSelect(action, noteToSelect) {
  return () => action(noteToSelect);
}

export default function NotePreview(props) {
  const { note, previewLines, selectNoteHandler } = props;
  const searchPhrase = useSelector(getSearchPhrase);
  const nbsp = '\u00A0';

  const preview = generatePreview(note, previewLines, searchPhrase);

  let title = preview.shift();
  if (title === nbsp) title = 'New Note...';

  return (
    <StyledNotePreview onClick={performNoteSelect(selectNoteHandler, note)}>
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
};

NotePreview.propTypes = {
  note: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  selectNoteHandler: PropTypes.func.isRequired,
  previewLines: PropTypes.oneOf([0, 1, 2, 3, 4]),
};
