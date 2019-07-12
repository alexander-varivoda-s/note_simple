import { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import verifyEmail from './actions';

export default function VerifyEmail(props) {
  const {
    match: {
      params: { token },
    },
  } = props;

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(verifyEmail(token));
  });

  return null;
}

VerifyEmail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
