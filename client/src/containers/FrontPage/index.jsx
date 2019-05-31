import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import Container from '../../components/Container';
import ContentContainer from './components/ContentContainer';
import RightColumn from './components/RightColumn';
import LeftColumn from './components/LeftColumn';
import {
  dataFetchStatus,
  getSelectedNoteId,
} from './selectors';
import { fetchDataAction, addNoteAction } from './actions';
import SearchBar from './containers/SearchBar';
import NotesList from './containers/NotesList';
import NoteEditor from './containers/NoteEditor';

class FrontPage extends PureComponent {
  static defaultProps = {
    noteSelected: null,
  };

  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    addNote: PropTypes.func.isRequired,
    noteSelected: PropTypes.string,
  };

  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  render() {
    const { addNote, noteSelected } = this.props;
    return (
      <Container>
        <Helmet>
          <title>Simplenote</title>
        </Helmet>
        <ContentContainer>
          <LeftColumn>
            <SearchBar addNote={addNote} />
            <NotesList />
          </LeftColumn>
          <RightColumn>
            { !!noteSelected && <NoteEditor /> }
          </RightColumn>
        </ContentContainer>

      </Container>
    );
  }
}

const mapStateToProps = state => ({
  dataIsFetched: dataFetchStatus(state),
  noteSelected: getSelectedNoteId(state),
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchDataAction()),
  addNote: text => () => dispatch(addNoteAction(text)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FrontPage);
