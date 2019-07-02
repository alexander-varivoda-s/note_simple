import React from 'react';
import { Helmet } from 'react-helmet/es/Helmet';

import Container from '../Container';
import CenteredContainer from '../CenteredContainer';

import { StyledMessage } from './styles';

export default function NotFoundPage() {
  return (
    <Container>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <CenteredContainer>
        <StyledMessage>404 Page not found.</StyledMessage>
      </CenteredContainer>
    </Container>
  );
}
