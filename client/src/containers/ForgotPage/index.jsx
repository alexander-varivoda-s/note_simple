import React from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '../../components/PageHeader';
import PageTitle from '../../components/PageTitle';
import Container from '../../components/Container';
import CenteredContainer from '../../components/CenteredContainer';
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
        <PageTitle fontSize='1.9rem'>Forgot your password?</PageTitle>
        <FlashMessages />
        <ForgotPasswordFormContainer />
      </CenteredContainer>
    </Container>
  );
}
