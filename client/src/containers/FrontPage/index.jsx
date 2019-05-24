import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Container from '../../components/Container';
import { dataFetchStatus } from './selectors';
import fetchDataAction from './actions';

class FrontPage extends PureComponent {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  render() {
    return (
      <Container>
        <Helmet>
          <title>Simplenote</title>
        </Helmet>
        <div>Front Page</div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  dataIsFetched: dataFetchStatus(state),
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchDataAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FrontPage);
