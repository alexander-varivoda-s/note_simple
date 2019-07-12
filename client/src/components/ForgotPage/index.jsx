import React from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '../Shared/components/PageHeader';
import PageTitle from '../Shared/components/PageTitle';
import Container from '../Shared/components/Container';
import CenteredContainer from '../Shared/components/CenteredContainer';
import ForgotPasswordFormContainer from './containers/ForgotPasswordFormContainer';
import FlashMessages from '../FlashMessages';

export default function ForgotPage() {
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
        <PageTitle fontSize='1.9rem'>Forgot password?</PageTitle>
        <FlashMessages />
        <ForgotPasswordFormContainer />
      </CenteredContainer>
    </Container>
  );
}
