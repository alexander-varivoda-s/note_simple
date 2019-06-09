import styled from 'styled-components';

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
  display: flex;
  flex: 1 0 auto;
  min-height: 1.857em;
  overflow: visible;
`;
