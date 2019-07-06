import styled, { css } from 'styled-components';

export const StyledNoteEditor = styled.div`
  animation-delay: 0.3s;
  animation-direction: normal;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding-top: 0;
  transition: padding-top 0.5s ease-in-out;

  ${props =>
    props.revisionSelectorVisible &&
    css`
      padding-top: 3.625em;
    `}

  textarea {
    background-color: transparent;
    border: none;
    height: 100%;
    font-family: ${props => props.theme.font};
    font-size: 1rem;
    line-height: 1.5;
    outline: none;
    padding: 1.5em;
    resize: none;
    width: 100%;
  }
`;

export const TextareaWrapper = styled.div`
  flex: 1 1 auto;
  margin: 0 auto;
  max-width: 48.75em;
  width: 100%;
`;
