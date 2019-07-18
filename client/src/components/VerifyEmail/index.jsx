import { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { emailVerificationAction } from './actions';

export default function VerifyEmail(props) {
  const {
    match: {
      params: { token },
    },
  } = props;

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(emailVerificationAction(token));
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
