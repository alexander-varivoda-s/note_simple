import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getUser } from '../../../User/selectors';

export default function AnonymousRoute({ component: Component, ...rest }) {
  const user = useSelector(getUser);

  return (
    <Route
      {...rest}
      render={props => (!user ? <Component {...props} /> : <Redirect to='/' />)}
    />
  );
}

AnonymousRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.object])
    .isRequired,
};
