import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMenuVisibilityStatus } from '../../selectors';

import { IconButton } from '../../../Shared/components/Button';
import SVG from '../../../Shared/components/SVG';
import { toggleMenu } from '../Menu/actions';

export default function MenuToggle() {
  const isMenuVisible = useSelector(getMenuVisibilityStatus);

  const dispatch = useDispatch();

  function menuToggleHandler() {
    dispatch(toggleMenu(!isMenuVisible));
  }

  return (
    <IconButton title='Menu' onClick={menuToggleHandler}>
      <SVG name='menu' size='24' />
    </IconButton>
  );
}
