import React, { useState, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { tagNoteAction, untagNoteAction } from './actions';
import { getSelectedNoteTags, getTagsDiff } from '../../selectors';

const StyledTagsEditor = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 0.875rem;
  line-height: 1.75;
  max-height: calc(2.5 * 1.75em + 1rem);
  outline: none;
  overflow-y: scroll;
  padding: 0.571em 0.857em;
`;

const Input = styled.input`
  border: none;
  display: flex;
  font-family: ${props => props.theme.font};
  font-size: 0.875rem;
  min-width: 1px;
`;

const FakeInput = styled.span`
  position: absolute;
  visibility: hidden;
  z-index: 0;
`;

const Suggestion = styled.div`
  color: #9a9a9a;
`;

const InputWrapper = styled.div`
  align-items: baseline;
  display: flex;
  flex: 1 0 auto;
  min-height: 1.857em;
  overflow: visible;
`;

const NotesTagsListWrapper = styled.div``;

const StyledNotesTagsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;

  & > * {
    margin: 0 0.7em 0.57em 0;
  }
`;

const NotesTagsListItem = styled.li``;

const Tag = styled.div`
  align-items: center;
  background-color: #cdcdcd;
  border-radius: 15px;
  color: #4d4d4d;
  cursor: default;
  flex: none;
  padding: 0 1em;
  white-space: nowrap;

  &:hover,
  &:focus {
    background-color: gray;
    color: #fff;
  }
`;

function TagsEditor(props) {
  const { selectedNoteTags, tagsDiff, dispatch } = props;

  const _hidden = useRef(null);
  const _input = useRef(null);
  const _editor = useRef(null);

  const [tagName, setTagName] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  function handleChange(e) {
    const { value } = e.target;

    const availableSuggestions = !value
      ? []
      : tagsDiff.filter(tag => tag.name.startsWith(value));

    setSuggestions(availableSuggestions || []);
    setTagName(value);
  }

  function handleKeyPress(e) {
    const {
      key,
      target: { value },
    } = e;

    if (value && key === 'Enter') {
      const payload = {};
      if (suggestions.length) {
        const suggestion = suggestions.find(s => s.name === value);
        if (suggestion) {
          payload.tagId = suggestion._id;
        }
        setSuggestions([]);
      }

      if (!payload.tagId) {
        payload.name = value;
      }

      dispatch(tagNoteAction(payload));
      setTagName('');
    }
  }

  function handleKeyDown(e) {
    const { key } = e;

    if (key === 'Backspace') {
      if (!tagName && selectedNoteTags.length && !selectedTag) {
        const tagToSelect = selectedNoteTags[selectedNoteTags.length - 1];
        setSelectedTag(tagToSelect);
        const tagNode = document.querySelector(
          `div[data-tag-id="${tagToSelect._id}"]`
        );
        tagNode.focus();
      }

      if (selectedTag) {
        dispatch(untagNoteAction(selectedTag._id));
        setSelectedTag(null);
        _input.current.focus();
      }
    }

    if (key === 'Tab') {
      if (e.target === _input.current) {
        e.preventDefault();

        if (suggestions.length) {
          dispatch(tagNoteAction({ tagId: suggestions[0]._id }));
          setTagName('');
          setSuggestions([]);
        }
      }
    }
  }

  function isTagSelected(id) {
    return selectedTag && selectedTag._id === id;
  }

  function handleClick(e) {
    const {
      dataset: { tagId },
    } = e.target;
    if (isTagSelected(tagId)) {
      setSelectedTag(null);
    }
    dispatch(untagNoteAction(tagId));
  }

  function handleBlur() {
    if (selectedTag) {
      setSelectedTag(null);
    }
  }

  function handleSuggestionClick() {
    _input.current.focus();
  }

  useLayoutEffect(() => {
    _hidden.current.innerText = tagName || 'Add tag...';
    const { width } = _hidden.current.getBoundingClientRect();
    _input.current.style.width = `${Math.ceil(width)}px`;
  }, [tagName]);

  console.log('render');

  return (
    <StyledTagsEditor
      ref={_editor}
      tabIndex='-1'
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    >
      <NotesTagsListWrapper>
        <StyledNotesTagsList>
          {selectedNoteTags.map(tag => (
            <NotesTagsListItem key={tag._id}>
              <Tag data-tag-id={tag._id} onClick={handleClick} tabIndex='0'>
                {tag.name}
              </Tag>
            </NotesTagsListItem>
          ))}
          <InputWrapper>
            <FakeInput ref={_hidden}>{tagName || 'Add tag...'}</FakeInput>
            <Input
              value={tagName}
              onKeyPress={handleKeyPress}
              onChange={handleChange}
              placeholder='Add tag...'
              aria-label='Add tag...'
              ref={_input}
              autoComplete='false'
            />
            <Suggestion aria-disabled onClick={handleSuggestionClick}>
              {suggestions.length
                ? suggestions[0].name.substring(tagName.length)
                : ''}
            </Suggestion>
          </InputWrapper>
        </StyledNotesTagsList>
      </NotesTagsListWrapper>
    </StyledTagsEditor>
  );
}

TagsEditor.propTypes = {
  tagsDiff: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedNoteTags: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  selectedNoteTags: getSelectedNoteTags(state),
  tagsDiff: getTagsDiff(state),
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagsEditor);
