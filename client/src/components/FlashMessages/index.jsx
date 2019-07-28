import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getFlashMessages } from './selectors';
import { clearFlashMessages } from './actions';

import { StyledFlashMessages, FlashMessage } from './styles';

function FlashMessages(props) {
  const { history } = props;
  const messages = useSelector(getFlashMessages);
  const dispatch = useDispatch();

  const clearMessages = useCallback(() => dispatch(clearFlashMessages), [
    dispatch,
  ]);

  useEffect(() => {
    const unListen = history.listen(() => {
      if (messages.length) {
        clearMessages();
      }
    });

    return () => unListen();
  }, [history, messages, clearMessages]);

  return (
    <StyledFlashMessages>
      <ul>
        {messages.map(m => (
          <li key={m.id}>
            <FlashMessage type={m.type}>{m.message}</FlashMessage>
          </li>
        ))}
      </ul>
    </StyledFlashMessages>
  );
}

FlashMessages.propTypes = {
  history: PropTypes.shape({
    listen: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(FlashMessages);
