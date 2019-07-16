import styled from 'styled-components';
import { BorderlessButton } from '../../../Shared/components/Button';

// eslint-disable-next-line import/prefer-default-export
export const Header = styled.header`
  align-items: center;
  border-bottom: 1px solid #e0e2e4;
  display: flex;
  justify-content: space-between;
  margin: 0 0 0.313em;

  h2 {
    font-size: 1.25rem;
    font-weight: 400;
    margin: 0 0 0.2em;
  }

  ${BorderlessButton} {
    color: ${props => props.theme.palette.main};
    font-size: 0.75rem;
    padding: 0;
    text-transform: uppercase;
  }
`;
