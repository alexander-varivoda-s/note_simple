import styled from 'styled-components';

export const StyledTagsEditor = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 0.875rem;
  line-height: 1.75;
  max-height: calc(2.5 * 1.75em + 1rem);
  outline: none;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0.571em 0.857em;
`;

export const Input = styled.input`
  border: none;
  display: flex;
  font-family: ${props => props.theme.font};
  font-size: 0.875rem;
  min-width: 1px;
`;

export const FakeInput = styled.span`
  position: absolute;
  visibility: hidden;
  z-index: 0;
`;

export const Suggestion = styled.div`
  color: #9a9a9a;
`;

export const InputWrapper = styled.div`
  align-items: baseline;
  display: flex;
  flex: 1 0 auto;
  min-height: 1.857em;
  overflow: visible;
`;

export const NotesTagsListWrapper = styled.div``;

export const StyledNotesTagsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;

  & > * {
    margin: 0 0.7em 0.57em 0;
  }
`;

export const Tag = styled.div`
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
