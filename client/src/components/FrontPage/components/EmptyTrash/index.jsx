import React from 'react';
import { useDispatch } from 'react-redux';

import { StyledEmptyTrash } from './styles';
import { BorderlessButton } from '../../../Shared/components/Button';
import { emptyTrashAction } from './actions';

export default function EmptyTrash() {
  const dispatch = useDispatch();

  const emptyTrashHandler = () => {
    dispatch(emptyTrashAction());
  };

  return (
    <StyledEmptyTrash>
      <BorderlessButton onClick={emptyTrashHandler}>
        Empty Trash
      </BorderlessButton>
    </StyledEmptyTrash>
  );
}
