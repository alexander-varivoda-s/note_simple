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

const placeholderByFilter = (filter) => {
  const found = filter.match(/tag:(\S+)/);

  if (found) {
    return found[1];
  } if (filter === 'trash') {
    return 'Trash';
  }

  return 'All Notes';
};

export default function SearchInput(props) {
  const {
    filter, searchPhrase, handleSearch, handleClear,
  } = props;

  return (
    <StyledSearchInput>
      <input type='text' placeholder={placeholderByFilter(filter)} onChange={handleSearch} value={searchPhrase} />
      {searchPhrase.length > 0 && (
        <Button type='button' title='Clear' onClick={handleClear}>
          <SVG name='cross' size='22' />
        </Button>
      )}
    </StyledSearchInput>
  );
}

SearchInput.propTypes = {
  filter: PropTypes.string.isRequired,
  searchPhrase: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
};
