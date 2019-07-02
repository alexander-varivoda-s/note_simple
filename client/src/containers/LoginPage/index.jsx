import React from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '../../components/PageHeader';
import PageTitle from '../../components/PageTitle';
import Container from '../../components/Container';
import CenteredContainer from '../../components/CenteredContainer';
import LoginFormContainer from './containers/LoginFormContainer';
import FlashMessages from '../FlashMessages';
import { StyledLink } from './styles';

export default function LoginPage() {
  return (
    <Container>
      <Helmet>
        <title>Sign in to Simplenote</title>
        <meta
          name='description'
          content='Simplenote is an easy way to keep notes, lists, ideas, and more.'
        />
      </Helmet>
      <PageHeader />
      <CenteredContainer>
        <PageTitle>Sign In</PageTitle>
        <FlashMessages />
        <LoginFormContainer />
        <StyledLink to='/forgot'>Forgot you password?</StyledLink>
      </CenteredContainer>
    </Container>
  );
}
