import styled from 'styled-components';

export const StyledToolbar = styled.div`
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.palette.borderColor};
  display: flex;
  flex: 0 0 3.5em;
  padding: 0 1em;

  ul:last-of-type {
    margin-left: auto;
  }

  div:first-child {
    margin-left: auto;
  }
`;

export const ToolsList = styled.ul`
  display: flex;

  & > li {
    margin-right: 0.875em;
  }
`;
