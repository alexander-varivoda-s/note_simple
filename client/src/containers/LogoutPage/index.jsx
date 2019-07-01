import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import logout from './actions';
import PageLoader from '../../components/PageLoader';

export default function LogoutPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  return <PageLoader />;
}
