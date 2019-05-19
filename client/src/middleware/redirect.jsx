import { REDIRECT } from '../containers/shared/constants';

export default history => () => next => (action) => {
  if (action.type !== REDIRECT) {
    next(action);
  } else {
    const { to } = action.payload;
    history.push(to);
  }
};
