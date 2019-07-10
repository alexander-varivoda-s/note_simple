import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tagNoteAction, untagNoteAction } from './actions';
import { getSelectedNoteTags, getTagsDiff } from '../../selectors';

import {
  StyledTagsEditor,
  Suggestion,
  Input,
  InputWrapper,
  NotesTagsListWrapper,
  StyledNotesTagsList,
  Tag,
  FakeInput,
} from './styles';

export default function TagsEditor() {
  const tagsDiff = useSelector(getTagsDiff);
  const selectedNoteTags = useSelector(getSelectedNoteTags);

  const _hidden = useRef(null);
  const _input = useRef(null);
  const _editor = useRef(null);

  const [inputInFocus, setInputInFocus] = useState(false);
  const [tagName, setTagName] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const dispatch = useDispatch();

  function changeHandler(e) {
    const { value } = e.target;

    const availableSuggestions = !value
      ? []
      : tagsDiff.filter(tag => tag.name.startsWith(value));

    setSuggestions(availableSuggestions || []);
    setTagName(value);
  }

  function keyPressHandler(e) {
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

  function backspaceHandler() {
    if (!tagName && selectedNoteTags.length && !selectedTag) {
      const tagToSelect = selectedNoteTags[selectedNoteTags.length - 1];
      setSelectedTag(tagToSelect);

      const tagNode = document.querySelector(
        `div[data-tag-id="${tagToSelect._id}"]`
      );

      if (tagNode) {
        tagNode.focus();
      }
    }

    if (selectedTag) {
      const { current: input } = _input;
      dispatch(untagNoteAction(selectedTag._id));
      setSelectedTag(null);
      input.focus();
    }
  }

  function tabHandler(e) {
    const { target } = e;
    if (target === _input.current && suggestions.length) {
      dispatch(tagNoteAction({ tagId: suggestions[0]._id }));
      setTagName('');
      setSuggestions([]);
      setInputInFocus(true);
    }
  }

  console.log(tagName, suggestions, inputInFocus);

  function keyDownHandler(e) {
    const { key } = e;

    if (key === 'Backspace') {
      backspaceHandler();
    }

    if (key === 'Tab') {
      tabHandler(e);
    }
  }

  function isTagSelected(id) {
    return selectedTag && selectedTag._id === id;
  }

  function clickHandler(e) {
    const {
      dataset: { tagId },
    } = e.target;

    if (isTagSelected(tagId)) {
      setSelectedTag(null);
    }

    dispatch(untagNoteAction(tagId));
  }

  function blurHandler() {
    if (selectedTag) {
      setSelectedTag(null);
    }

    if (inputInFocus) {
      setInputInFocus(false);
    }
  }

  function suggestionClickHandler() {
    const { current: input } = _input;
    input.focus();
  }

  function focusHandler() {
    const { current: input } = _input;
    input.selectionStart = input.value.length;
    input.selectionEnd = input.value.length;
  }

  useLayoutEffect(() => {
    const { current: fakeInput } = _hidden;
    const { current: input } = _input;

    fakeInput.innerText = tagName || 'Add tag...';
    const { width } = fakeInput.getBoundingClientRect();
    input.style.width = `${Math.ceil(width)}px`;
  }, [tagName]);

  useEffect(() => {
    if (inputInFocus) {
      const { current: input } = _input;
      input.focus();
    }
  }, [inputInFocus]);

  return (
    <StyledTagsEditor
      ref={_editor}
      tabIndex='-1'
      onKeyDown={keyDownHandler}
      onBlur={blurHandler}
    >
      <NotesTagsListWrapper>
        <StyledNotesTagsList>
          {selectedNoteTags.map(tag => (
            <li key={tag._id}>
              <Tag data-tag-id={tag._id} onClick={clickHandler} tabIndex='0'>
                {tag.name}
              </Tag>
            </li>
          ))}
          <InputWrapper>
            <FakeInput ref={_hidden} />
            <Input
              value={tagName}
              onKeyPress={keyPressHandler}
              onChange={changeHandler}
              placeholder='Add tag...'
              aria-label='Add tag...'
              ref={_input}
              autoComplete='false'
              onFocus={focusHandler}
            />
            <Suggestion aria-disabled onClick={suggestionClickHandler}>
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
