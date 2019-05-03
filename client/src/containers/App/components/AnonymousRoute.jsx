import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUser } from '../../User/selectors';

function AnonymousRoute({ component: Component, user, ...rest }) {
  return (
    <Route {...rest} render={props => (!user ? <Component {...props} /> : <Redirect to='/' />)} />
  );
}

AnonymousRoute.defaultProps = {
  user: null,
};

AnonymousRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    updated: PropTypes.string.isRequired,
  }),
};

export default connect(state => ({ user: getUser(state) }))(AnonymousRoute);
