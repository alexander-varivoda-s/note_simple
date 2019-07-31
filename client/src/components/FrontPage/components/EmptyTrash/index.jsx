import React from 'react';
import { useDispatch } from 'react-redux';

import { StyledEmptyTrash } from './styles';
import { BorderlessButton } from '../../../Shared/components/Button';
import { emptyTrash } from './actions';

export default function EmptyTrash() {
  const dispatch = useDispatch();

  const emptyTrashHandler = () => {
    dispatch(emptyTrash());
  };

  return (
    <StyledEmptyTrash>
      <BorderlessButton onClick={emptyTrashHandler}>
        Empty Trash
      </BorderlessButton>
    </StyledEmptyTrash>
  );
}
