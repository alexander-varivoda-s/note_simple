import React from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '../../components/PageHeader';
import PageTitle from '../../components/PageTitle';
import Container from '../../components/Container';
import CenteredContainer from '../../components/CenteredContainer';
import RegisterFormContainer from './containers/RegisterFormContainer';
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
        <RegisterFormContainer />
      </CenteredContainer>
    </Container>
  );
}
