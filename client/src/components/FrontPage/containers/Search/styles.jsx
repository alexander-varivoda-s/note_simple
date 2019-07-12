import styled from 'styled-components';
import Button from '../../../Shared/components/Button';

export const StyledSearch = styled.div`
  margin: 0 0.625em;
  position: relative;

  ${Button} {
    position: absolute;
    top: 0.071em;
    right: 0.243em;

    svg {
      fill: ${props => props.theme.searchBar.clearBtnColor};
    }
  }
`;

export const SearchInput = styled.input`
  border: 1px solid ${props => props.theme.searchBar.borderColor};
  border-radius: 50px;
  font-family: ${props => props.theme.font};
  font-size: 0.875rem;
  height: 1.714em;
  line-height: 2;
  padding: 0 1.8em 0 1.071em;
  width: 14.286em;
`;
