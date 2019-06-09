import React, { useLayoutEffect, useRef } from 'react';
import { InputWrapper, FakeInput, Input, Suggestion } from './styles';
import { tagNoteAction } from '../../actions';

function TagsEditorInput() {
  const _hidden = useRef(null);

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

  useLayoutEffect(() => {
    _hidden.current.innerText = tagName || 'Add tag...';
    const { width } = _hidden.current.getBoundingClientRect();
    _input.current.style.width = `${Math.ceil(width)}px`;
  }, [tagName]);

  return (
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
      <Suggestion aria-disabled>
        {suggestions.length
          ? suggestions[0].name.substring(tagName.length)
          : ''}
      </Suggestion>
    </InputWrapper>
  );
}

export default TagsEditorInput;
