import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { getSearchPhrase } from './selectors';
import searchAction from './actions';

import Button from '../../../../components/Button';
import SVG from '../../../../components/SVG';
import SearchInput from './components/SearchInput';

const StyledSearchBar = styled.div`
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.palette.borderColor};
  border-right: 1px solid ${props => props.theme.palette.borderColor};
  display: flex;
  flex: 0 0 3.5em;
  justify-content: space-between;
  padding: 0 1em;
  width: 100%;
`;

function SearchBar(props) {
  const { searchPhrase, handleSearch, handleClear, addNote } = props;

  return (
    <StyledSearchBar>
      <Button type='button' title='Menu'>
        <SVG name='menu' size='24' />
      </Button>
      <SearchInput
        searchPhrase={searchPhrase}
        handleSearch={handleSearch}
        handleClear={handleClear}
        filter='notes'
      />
      <Button type='button' title='Add Note' onClick={addNote(searchPhrase)}>
        <SVG name='add-note' size='22' />
      </Button>
    </StyledSearchBar>
  );
}

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
  searchPhrase: PropTypes.string.isRequired,
  addNote: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  searchPhrase: getSearchPhrase(state),
});

const mapDispatchToProps = dispatch => ({
  handleSearch: e => dispatch(searchAction(e.target.value)),
  handleClear: () => dispatch(searchAction('')),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
