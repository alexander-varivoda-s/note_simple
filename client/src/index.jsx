import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store';

const store = configureStore();

// eslint-disable-next-line react/no-render-return-value
const render = Component => ReactDOM.render(
  <Provider store={store}>
    <Component />
  </Provider>,
  document.getElementById('root'),
);

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./App').default;
    render(NextApp);
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
