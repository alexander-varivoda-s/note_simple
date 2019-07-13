import React from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '../Shared/components/PageHeader';
import PageTitle from '../Shared/components/PageTitle';
import Container from '../Shared/components/Container';
import CenteredContainer from '../Shared/components/CenteredContainer';
import LoginForm from './components/LoginForm';
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
        <LoginForm />
        <StyledLink to='/forgot'>Forgot you password?</StyledLink>
      </CenteredContainer>
    </Container>
  );
}
