import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import GlobalStyle from '../../theme/GlobalStyle';
import Container from '../../components/Container';
import AnonymousRoute from './components/AnonymousRoute';
import PrivateRoute from './components/PrivateRoute';
import PageLoader from '../../components/PageLoader';

import getCurrentUser from './actions';
import NotFoundPage from '../../components/NotFoundPage';

const LoginPage = lazy(() => import('../LoginPage'));
const RegisterPage = lazy(() => import('../RegisterPage'));
const VerifyEmail = lazy(() => import('../VerifyEmail'));
const FrontPage = lazy(() => import('../FrontPage'));
const ForgotPage = lazy(() => import('../ForgotPage'));
const ResetPasswordPage = lazy(() => import('../ResetPasswordPage'));
const LogoutPage = lazy(() => import('../LogoutPage'));
const SettingsPage = lazy(() => import('../SettingsPage'));

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <Container>
      <GlobalStyle />
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <PrivateRoute exact path='/' component={FrontPage} />
          <PrivateRoute exact path='/logout' component={LogoutPage} />
          <PrivateRoute exact path='/settings' component={SettingsPage} />
          <AnonymousRoute exact path='/login' component={LoginPage} />
          <AnonymousRoute exact path='/register' component={RegisterPage} />
          <AnonymousRoute exact path='/verify/:token' component={VerifyEmail} />
          <AnonymousRoute exact path='/forgot' component={ForgotPage} />
          <AnonymousRoute
            exact
            path='/password/:token/reset'
            component={ResetPasswordPage}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </Suspense>
    </Container>
  );
}
