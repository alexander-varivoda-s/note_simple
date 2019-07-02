import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import searchAction from './actions';

import Button from '../../../../components/Button';
import SVG from '../../../../components/SVG';
import SearchInput from './components/SearchInput';
import { toggleMenuVisibilityAction } from '../Menu/actions';
import {
  getFilter,
  getMenuVisibilityStatus,
  getSearchPhrase,
} from '../../selectors';

import { StyledSearchBar } from './styles';
import { addNoteAction } from '../../actions';

function mapFilterToPlaceholder(filter) {
  const placeholders = {
    all: 'All Notes',
    trash: 'Trash',
  };

  return placeholders[filter] || '';
}

export default function SearchBar() {
  const isMenuVisible = useSelector(getMenuVisibilityStatus);
  const searchPhrase = useSelector(getSearchPhrase);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  function menuToggleHandler() {
    dispatch(toggleMenuVisibilityAction(!isMenuVisible));
  }

  function searchHandler(e) {
    const { value } = e.target;
    dispatch(searchAction(value));
  }

  function clearHandler() {
    dispatch(searchAction(''));
  }

  function addNoteHandler() {
    dispatch(addNoteAction(searchPhrase));
  }

  return (
    <StyledSearchBar>
      <Button type='button' title='Menu' onClick={menuToggleHandler}>
        <SVG name='menu' size='24' />
      </Button>
      <SearchInput
        searchPhrase={searchPhrase}
        handleSearch={searchHandler}
        handleClear={clearHandler}
        placeholder={mapFilterToPlaceholder(filter)}
      />
      <Button type='button' title='Add Note' onClick={addNoteHandler}>
        <SVG name='add-note' size='22' />
      </Button>
    </StyledSearchBar>
  );
}
