import styled from 'styled-components';

export const StyledPinner = styled.div`
  margin: 0.9em 1.25em 0 0;
`;

export const Outer = styled.span`
  border: 2px solid ${props => props.theme.notesList.checkboxOuter};
  border-radius: 50%;
  height: 14px;
  position: absolute;
  width: 14px;
`;

export const Inner = styled.span`
  background-color: ${props => props.theme.notesList.checkboxInner};
  border-radius: 50%;
  border: none;
  height: 8px;
  left: 1px;
  position: absolute;
  top: 1px;
  width: 8px;
`;
