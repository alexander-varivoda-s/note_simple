import React from 'react';
import { Switch } from 'react-router-dom';

import GlobalStyle from '../../theme/GlobalStyle';
import Container from '../../components/Container';
import LoginPage from '../LoginPage';
import AnonymousRoute from './components/AnonymousRoute';

function App() {
  return (
    <Container>
      <GlobalStyle />
      <Switch>
        <AnonymousRoute exact path='/login' component={LoginPage} />
      </Switch>
    </Container>
  );
}

export default App;
