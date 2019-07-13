import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSearchPhrase } from '../../selectors';

import Button from '../../../Shared/components/Button';
import SVG from '../../../Shared/components/SVG';
import { addNoteAction } from '../../actions';

export default function AddNote() {
  const searchPhrase = useSelector(getSearchPhrase);

  const dispatch = useDispatch();

  function addNoteHandler() {
    dispatch(addNoteAction(searchPhrase));
  }

  return (
    <Button type='button' title='Add Note' onClick={addNoteHandler}>
      <SVG name='add-note' size='22' />
    </Button>
  );
}
