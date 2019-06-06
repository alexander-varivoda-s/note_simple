import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { tagNoteAction } from './actions';

const StyledTagsEditor = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 0.875rem;
  line-height: 1.75;
  max-height: calc(2.5 * 1.75em + 1rem);
  padding: 0.571em 0.857em;
`;

const Input = styled.input`
  font-family: ${props => props.theme.font};
  font-size: 0.875rem;
  border: none;
  min-width: 5em;
  width: 5em;
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
  flex: 1 0 auto;
  min-height: 1.857em;
  overflow: visible;
`;

function TagsEditor(props) {
  const _hidden = React.createRef();
  const _input = React.createRef();
  const [tagName, setTagName] = useState('');

  const handleChange = e => {
    const { value } = e.target;
    _hidden.current.innerText = value;
    const { width } = _hidden.current.getBoundingClientRect();
    _input.current.style.width = `${width}px`;
    setTagName(value);
  };

  const handleKeyPress = e => {
    const { dispatch } = props;
    const {
      key,
      target: { value },
    } = e;

    if (value && key === 'Enter') {
      setTagName('');
      dispatch(tagNoteAction({ name: value }));
    }
  };

  return (
    <StyledTagsEditor>
      <InputWrapper>
        <FakeInput ref={_hidden}>Add tag...</FakeInput>
        <Input
          value={tagName}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          placeholder='Add tag...'
          aria-label='Add tag...'
          ref={_input}
          autoComplete={false}
        />
        <Suggestion aria-disabled />
      </InputWrapper>
    </StyledTagsEditor>
  );
}

TagsEditor.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapDispatchToProps)(TagsEditor);
