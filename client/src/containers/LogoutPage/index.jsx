import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import logout from './actions';

export default function LogoutPage() {
  const dispatch = useDispatch();
  dispatch(logout());

  return <Redirect to='/login' />;
}
