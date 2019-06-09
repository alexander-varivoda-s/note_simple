import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import FrontPageContainer from './components/FrontPageContainer';
import ContentContainer from './components/ContentContainer';
import RightColumn from './components/RightColumn';
import LeftColumn from './components/LeftColumn';
import {
  dataFetchStatus,
  getNoteInfoVisibilityStatus,
  getSelectedNote,
  getSelectedNoteId,
} from './selectors';
import { fetchDataAction, addNoteAction } from './actions';
import SearchBar from './containers/SearchBar';
import NotesList from './containers/NotesList';
import NoteEditor from './containers/NoteEditor';
import Toolbar from './containers/Toolbar';
import NoteInfo from './containers/NoteInfo';
import { toggleNoteVisibilityAction } from './containers/Toolbar/actions';

const Overlay = styled.div`
  background-color: #fff;
  opacity: 0.75;
  position: absolute;
  width: 100%;
  height: 100%;
`;

class FrontPage extends PureComponent {
  static defaultProps = {
    isNoteSelected: false,
    selectedNote: null,
  };

  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    addNote: PropTypes.func.isRequired,
    isNoteSelected: PropTypes.bool,
    selectedNote: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
      updated: PropTypes.string.isRequired,
      pinned: PropTypes.string,
      author: PropTypes.string.isRequired,
      is_deleted: PropTypes.bool.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
    isNoteInfoVisible: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  handleSidebarClose = () => {
    const { dispatch } = this.props;
    dispatch(toggleNoteVisibilityAction(false));
  };

  render() {
    const {
      addNote,
      isNoteSelected,
      selectedNote,
      isNoteInfoVisible,
    } = this.props;

    return (
      <FrontPageContainer isNoteInfoVisible={isNoteInfoVisible}>
        <Helmet title='Simplenote' />
        <ContentContainer>
          {isNoteInfoVisible && <Overlay onClick={this.handleSidebarClose} />}
          <LeftColumn>
            <SearchBar addNote={addNote} />
            <NotesList />
          </LeftColumn>
          <RightColumn>
            <Toolbar />
            {isNoteSelected && <NoteEditor note={selectedNote} />}
          </RightColumn>
        </ContentContainer>
        {isNoteInfoVisible && <NoteInfo note={selectedNote} />}
      </FrontPageContainer>
    );
  }
}

const mapStateToProps = state => ({
  dataIsFetched: dataFetchStatus(state),
  isNoteSelected: !!getSelectedNoteId(state),
  selectedNote: getSelectedNote(state),
  isNoteInfoVisible: getNoteInfoVisibilityStatus(state),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  fetchData: () => dispatch(fetchDataAction()),
  addNote: text => () => dispatch(addNoteAction(text)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FrontPage);
