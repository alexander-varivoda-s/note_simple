import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getFlashMessages } from './selectors';
import { clearFlashMessages } from './actions';
import FlashMessage from './components/FlashMessage';

const StyledFlashMessages = styled.div`
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin: 0.313em 0;
  }
`;

class FlashMessages extends PureComponent {
  static propTypes = {
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
      })
    ),
    history: PropTypes.shape({
      listen: PropTypes.func.isRequired,
    }).isRequired,
    clearMessages: PropTypes.func.isRequired,
  };

  static defaultProps = {
    messages: [],
  };

  componentDidMount() {
    const { history, clearMessages } = this.props;
    this._unlisten = history.listen(() => {
      const { messages } = this.props;
      if (messages.length) {
        clearMessages();
      }
    });
  }

  componentWillUnmount() {
    this._unlisten();
  }

  render() {
    const { messages } = this.props;

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
}

const mapStateToProps = state => ({
  messages: getFlashMessages(state),
});

const mapDispatchToProps = dispatch => ({
  clearMessages: () => dispatch(clearFlashMessages()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FlashMessages)
);
