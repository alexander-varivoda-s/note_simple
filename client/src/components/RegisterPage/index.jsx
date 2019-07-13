import React from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '../Shared/components/PageHeader';
import PageTitle from '../Shared/components/PageTitle';
import Container from '../Shared/components/Container';
import CenteredContainer from '../Shared/components/CenteredContainer';
import RegisterForm from './components/RegisterForm';
import FlashMessages from '../FlashMessages';

export default function RegisterPage() {
  return (
    <Container>
      <Helmet>
        <title>Create a Simplenote account</title>
        <meta
          name='description'
          content='Simplenote is an easy way to keep notes, lists, ideas, and more.'
        />
      </Helmet>
      <PageHeader />
      <CenteredContainer>
        <PageTitle>Create an account</PageTitle>
        <FlashMessages />
        <RegisterForm />
      </CenteredContainer>
    </Container>
  );
}
