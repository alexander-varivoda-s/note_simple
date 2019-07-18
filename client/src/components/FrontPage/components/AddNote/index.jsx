import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFilter, getSearchPhrase } from '../../selectors';

import { IconButton } from '../../../Shared/components/Button';
import SVG from '../../../Shared/components/SVG';
import { addNoteAction } from '../../actions';
import { TRASH } from '../../../Shared/constants';

export default function AddNote() {
  const filter = useSelector(getFilter);
  const searchPhrase = useSelector(getSearchPhrase);

  const dispatch = useDispatch();

  function addNoteHandler() {
    if (filter !== TRASH) {
      dispatch(addNoteAction(searchPhrase));
    }
  }

  return (
    <IconButton
      type='button'
      title='Add Note'
      onClick={addNoteHandler}
      disabled={filter === TRASH}
    >
      <SVG name='add-note' size='22' />
    </IconButton>
  );
}
