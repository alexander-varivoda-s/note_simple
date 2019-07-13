import styled from 'styled-components';
import Button from '../../../Shared/components/Button';

export const StyledToolbar = styled.div`
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.palette.borderColor};
  display: flex;
  flex: 0 0 3.5em;
  justify-content: space-between;
  padding: 0 1em;

  ${Button} {
    height: 2em;
    width: 2em;
  }
`;

export const ToolsList = styled.ul`
  display: flex;

  & > li {
    margin-right: 0.875em;
  }
`;
