import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import searchAction from './actions';
import { getFilter, getSearchPhrase } from '../../selectors';
import { IconButton } from '../../../Shared/components/Button';
import SVG from '../../../Shared/components/SVG';

import { StyledSearch, SearchInput } from './styles';

export default function Search() {
  const placeholders = {
    all: 'All Notes',
    trash: 'Trash',
  };

  const searchPhrase = useSelector(getSearchPhrase);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  function changeHandler(e) {
    const { value } = e.target;
    dispatch(searchAction(value));
  }

  function clickHandler() {
    dispatch(searchAction(''));
  }

  return (
    <StyledSearch>
      <SearchInput
        type='text'
        placeholder={placeholders[filter] || filter}
        onChange={changeHandler}
        value={searchPhrase}
      />
      {!!searchPhrase.length && (
        <IconButton svg title='Clear' onClick={clickHandler}>
          <SVG name='cross' size='22' />
        </IconButton>
      )}
    </StyledSearch>
  );
}
