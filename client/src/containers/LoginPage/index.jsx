import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import PageTitle from '../../components/PageTitle';
import Container from '../../components/Container';
import CenteredContainer from '../../components/CenteredContainer';
import LoginFormContainer from './containers/LoginFormContainer';
import FlashMessages from '../FlashMessages';

const StyledLink = styled(Link)`
  display: inline-block;
  font-size: 0.75rem;
  padding: 1.5em 0 0;
  text-align: center;
  width: 100%;
`;

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
