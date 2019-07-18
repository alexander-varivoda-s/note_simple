import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { logoutAction } from './actions';
import PageLoader from '../Shared/components/PageLoader';

export default function LogoutPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  return <PageLoader />;
}
