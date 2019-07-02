import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const StyledSearchBar = styled.div`
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.palette.borderColor};
  border-right: 1px solid ${props => props.theme.palette.borderColor};
  display: flex;
  flex: 0 0 3.5em;
  justify-content: space-between;
  padding: 0 1em;
  width: 100%;
`;
