import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter, getSearchPhrase } from '../../selectors';
import { IconButton } from '../../../Shared/components/Button';
import SVG from '../../../Shared/components/SVG';

import { StyledSearch, SearchInput } from './styles';
import { search } from './actions';

export default function Search() {
  const placeholders = {
    ALL_NOTES: 'All Notes',
    TRASH: 'Trash',
  };

  const searchPhrase = useSelector(getSearchPhrase);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  function changeHandler(e) {
    const { value } = e.target;
    dispatch(search(value));
  }

  function clearHandler() {
    dispatch(search(''));
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
        <IconButton svg title='Clear' onClick={clearHandler}>
          <SVG name='cross' size='22' />
        </IconButton>
      )}
    </StyledSearch>
  );
}
