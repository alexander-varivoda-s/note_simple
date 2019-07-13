import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getUser } from '../../../User/selectors';

export default function PrivateRoute({ component: Component, ...rest }) {
  const user = useSelector(getUser);

  return (
    <Route
      {...rest}
      render={props =>
        user ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.object])
    .isRequired,
};
