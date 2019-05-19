import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './rootReducer';
import saga from './rootSaga';
import history from './history';

import redirect from './middleware/redirect';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(redirect(history), sagaMiddleware)),
  );
  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./rootReducer', () => {
        store.replaceReducer(reducer);
      });
    }
  }

  sagaMiddleware.run(saga);

  return store;
};

export default configureStore;
