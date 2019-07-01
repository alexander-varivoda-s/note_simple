import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ErrorContainer, ErrorImage, ErrorMessage } from './styles';

export default class ErrorBoundary extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  state = {
    hasError: false,
  };

  componentDidCatch() {
    console.log('catch');
    this.setState({
      hasError: true,
    });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <ErrorContainer>
          <ErrorImage src='https://cdn.dribbble.com/users/1078347/screenshots/2799566/oops.png' />
          <ErrorMessage>Sorry something went wrong!!!</ErrorMessage>
        </ErrorContainer>
      );
    }

    return children;
  }
}
