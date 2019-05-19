import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import logout from './actions';

class LogoutPage extends PureComponent {
  static propTypes = {
    signOut: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { signOut } = this.props;
    signOut();
  }

  render() {
    return <Redirect to='/login' />;
  }
}

const mapDispatchToProps = dispatch => ({ signOut: () => dispatch(logout()) });

export default connect(
  null,
  mapDispatchToProps,
)(LogoutPage);
