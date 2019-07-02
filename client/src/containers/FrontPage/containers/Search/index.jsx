import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import searchAction from './actions';

import SearchInput from './components/SearchInput';

import { getFilter, getSearchPhrase } from '../../selectors';

function mapFilterToPlaceholder(filter) {
  const placeholders = {
    all: 'All Notes',
    trash: 'Trash',
  };

  return placeholders[filter] || '';
}

export default function Search() {
  const searchPhrase = useSelector(getSearchPhrase);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  function searchHandler(e) {
    const { value } = e.target;
    dispatch(searchAction(value));
  }

  function clearHandler() {
    dispatch(searchAction(''));
  }

  return (
    <SearchInput
      searchPhrase={searchPhrase}
      handleSearch={searchHandler}
      handleClear={clearHandler}
      placeholder={mapFilterToPlaceholder(filter)}
    />
  );
}
