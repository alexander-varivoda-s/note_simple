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
  display: flex;
  justify-content: space-between;
  height: 3.5em;
  max-width: 20.5em;
  padding: 0 1.25em;
  width: 100%;
`;

function SearchBar(props) {
  const { searchPhrase, search, addNote } = props;
  const handleSearch = e => search(e.target.value);
  const handleClear = () => search('');

  return (
    <StyledSearchBar>
      <Button type='button' title='Menu'>
        <SVG name='menu' size='24' />
      </Button>
      <SearchInput searchPhrase={searchPhrase} handleSearch={handleSearch} handleClear={handleClear} mode='notes' />
      <Button type='button' title='Add Note' onClick={addNote(searchPhrase)}>
        <SVG name='add-note' size='22' />
      </Button>
    </StyledSearchBar>
  );
}

SearchBar.propTypes = {
  search: PropTypes.func.isRequired,
  searchPhrase: PropTypes.string.isRequired,
  addNote: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  searchPhrase: getSearchPhrase(state),
});

const mapDispatchToProps = dispatch => ({
  search: phrase => dispatch(searchAction(phrase)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBar);
