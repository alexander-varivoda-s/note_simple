import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Redirect } from 'react-router-dom';

import GlobalStyle from '../../theme/GlobalStyle';
import Container from '../../components/Container';
import LoginPage from '../LoginPage';
import AnonymousRoute from './components/AnonymousRoute';
import { getUser } from '../User/selectors';

function App({ user }) {
  return (
    <Container>
      <GlobalStyle />
      <Switch>
        <AnonymousRoute exact path='/login' component={LoginPage} />
        <Redirect to={user ? '/' : '/login'} />
      </Switch>
    </Container>
  );
}

App.defaultProps = {
  user: null,
};

App.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    updated: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = state => ({
  user: getUser(state),
});

export default connect(mapStateToProps)(App);
