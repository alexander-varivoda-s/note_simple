import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store';
import defaultTheme from './theme/default';
import history from './history';

const store = configureStore();

const render = Component =>
  // eslint-disable-next-line react/no-render-return-value
  ReactDOM.render(
    <ThemeProvider theme={defaultTheme}>
      <Provider store={store}>
        <Router history={history}>
          <Component />
        </Router>
      </Provider>
    </ThemeProvider>,
    document.getElementById('root')
  );

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./components/App').default;
    render(NextApp);
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
