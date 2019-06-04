import React, { useState } from 'react';
import styled from 'styled-components';

const StyledTagsEditor = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 0.875rem;
  line-height: 1.75;
  max-height: calc(2.5 * 1.75em + 16px);
  padding: 0.571em 0.857em;
`;

const Input = styled.div`
  flex: 1 0 auto;
  min-height: 1.857em;
  overflow: visible;

  span {
    color: #9a9a9a;
    position: absolute;
  }

  div:first-of-type {
    display: inline-block;
    min-width: 1px;
  }

  div:last-of-type {
    color: #9a9a9a;
  }
`;

function TagsEditor() {
  const _input = React.createRef();
  const [tagName, setTagName] = useState('');
  const handleInput = e => {
    const { textContent } = e.target;
    setTagName(textContent);
  };

  const handleClick = () => _input.current.focus();

  return (
    <StyledTagsEditor>
      <Input>
        {tagName.length === 0 && (
          <span aria-hidden onClick={handleClick}>
            Add tag...
          </span>
        )}
        <div
          ref={_input}
          contentEditable
          spellCheck={false}
          aria-label='Add tag...'
          onInput={handleInput}
        />
        <div aria-disabled />
      </Input>
    </StyledTagsEditor>
  );
}

export default TagsEditor;
