import React, { lazy, Suspense, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Redirect } from 'react-router-dom';

import GlobalStyle from '../../theme/GlobalStyle';
import Container from '../../components/Container';
import AnonymousRoute from './components/AnonymousRoute';
import PrivateRoute from './components/PrivateRoute';
import PageLoader from '../../components/PageLoader';

import { getUser } from '../User/selectors';

import getCurrentUser from './actions';

const LoginPage = lazy(() => import('../LoginPage'));
const RegisterPage = lazy(() => import('../RegisterPage'));
const VerifyEmail = lazy(() => import('../VerifyEmail'));
const FrontPage = lazy(() => import('../FrontPage'));
const ForgotPage = lazy(() => import('../ForgotPage'));
const ResetPasswordPage = lazy(() => import('../ResetPasswordPage'));
const LogoutPage = lazy(() => import('../LogoutPage'));

class App extends PureComponent {
  static defaultProps = {
    user: null,
  };

  static propTypes = {
    signIn: PropTypes.func.isRequired,
    user: PropTypes.shape({
      displayName: PropTypes.string,
      email: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
      updated: PropTypes.string.isRequired,
    }),
  };

  componentDidMount() {
    const { signIn } = this.props;
    signIn();
  }

  render() {
    const { user } = this.props;
    return (
      <Container>
        <GlobalStyle />
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <PrivateRoute exact path='/' component={FrontPage} />
            <PrivateRoute exact path='/logout' component={LogoutPage} />
            <AnonymousRoute exact path='/login' component={LoginPage} />
            <AnonymousRoute exact path='/register' component={RegisterPage} />
            <AnonymousRoute exact path='/verify/:token' component={VerifyEmail} />
            <AnonymousRoute exact path='/forgot' component={ForgotPage} />
            <AnonymousRoute exact path='/password/:token/reset' component={ResetPasswordPage} />
            <Redirect to={user ? '/' : '/login'} />
          </Switch>
        </Suspense>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
  signIn: () => dispatch(getCurrentUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
