import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMenuVisibilityStatus } from '../../selectors';
import { toggleMenuVisibilityAction } from '../Menu/actions';

import { IconButton } from '../../../Shared/components/Button';
import SVG from '../../../Shared/components/SVG';

export default function MenuToggle() {
  const isMenuVisible = useSelector(getMenuVisibilityStatus);

  const dispatch = useDispatch();

  function menuToggleHandler() {
    dispatch(toggleMenuVisibilityAction(!isMenuVisible));
  }

  return (
    <IconButton title='Menu' onClick={menuToggleHandler}>
      <SVG name='menu' size='24' />
    </IconButton>
  );
}