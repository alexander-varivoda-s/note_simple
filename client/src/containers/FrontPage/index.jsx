import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import Container from '../../components/Container';
import { dataFetchStatus } from './selectors';
import { fetchDataAction, addNoteAction } from './actions';
import SearchBar from './containers/SearchBar';

class FrontPage extends PureComponent {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    addNote: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  render() {
    const { addNote } = this.props;
    return (
      <Container>
        <Helmet>
          <title>Simplenote</title>
        </Helmet>
        <div>Front Page</div>
        <SearchBar addNote={addNote} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  dataIsFetched: dataFetchStatus(state),
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchDataAction()),
  addNote: text => () => dispatch(addNoteAction(text)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FrontPage);
