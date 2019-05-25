import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../../../../../../components/Button';
import SVG from '../../../../../../components/SVG';

const StyledSearchInput = styled.div`
  margin: 0 0.625em;
  position: relative;

  input {
    border: 1px solid ${props => props.theme.searchBar.borderColor};
    border-radius: 50px;
    font-family: ${props => props.theme.font};
    font-size: 0.875rem;
    height: 1.714em;
    line-height: 2;
    padding: 0 1.8em 0 1.071em;
    width: 14.286em;
  }
  
  ${Button}{
    position: absolute;
    top: 0.071em;
    right: 0.243em;
    
    svg {
      fill: ${props => props.theme.searchBar.clearBtnColor};
    }
  }
`;

export default function SearchInput(props) {
  const {
    mode, searchPhrase, handleSearch, handleClear,
  } = props;
  const placeholder = mode === 'notes' ? 'All Notes' : 'Trash';

  return (
    <StyledSearchInput>
      <input type='text' placeholder={placeholder} onChange={handleSearch} value={searchPhrase} />
      {searchPhrase.length > 0 && (
        <Button type='button' title='Clear' onClick={handleClear}>
          <SVG name='cross' size='22' />
        </Button>
      )}
    </StyledSearchInput>
  );
}

SearchInput.propTypes = {
  mode: PropTypes.string.isRequired,
  searchPhrase: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
};
