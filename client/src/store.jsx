import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  const store = createStore(reducer, composeEnhancers(applyMiddleware()));
  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./rootReducer', () => {
        store.replaceReducer(reducer);
      });
    }
  }

  return store;
};

export default configureStore;
