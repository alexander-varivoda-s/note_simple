import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import PageHeader from '../Shared/components/PageHeader';
import PageTitle from '../Shared/components/PageTitle';
import Container from '../Shared/components/Container';
import CenteredContainer from '../Shared/components/CenteredContainer';
import ResetPasswordFormContainer from './containers/ResetPasswordFormContainer';
import FlashMessages from '../FlashMessages';

export default function ResetPasswordPage(props) {
  const {
    match: {
      params: { token },
    },
  } = props;

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
        <PageTitle>Reset your password</PageTitle>
        <FlashMessages />
        <ResetPasswordFormContainer token={token} />
      </CenteredContainer>
    </Container>
  );
}

ResetPasswordPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
