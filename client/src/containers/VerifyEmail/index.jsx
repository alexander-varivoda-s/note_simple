import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import verifyEmail from './actions';

class VerifyEmail extends PureComponent {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        token: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    verify: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const {
      match: {
        params: { token },
      },
      verify,
    } = this.props;

    verify(token);
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch => ({
  verify: token => dispatch(verifyEmail(token)),
});

export default connect(
  null,
  mapDispatchToProps,
)(VerifyEmail);
