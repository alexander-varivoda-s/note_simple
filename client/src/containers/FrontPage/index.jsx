import React, { useEffect, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

import FrontPageContainer from './components/FrontPageContainer';
import ContentContainer from './components/ContentContainer';
import RightColumn from './components/RightColumn';
import LeftColumn from './components/LeftColumn';
import {
  getMenuVisibilityStatus,
  getNoteInfoVisibilityStatus,
  getSelectedNote,
  getSidebarVisibilityStatus,
} from './selectors';
import { fetchDataAction } from './actions';
import SearchBar from './containers/SearchBar';
import NotesList from './containers/NotesList';
import NoteEditor from './containers/NoteEditor';
import Toolbar from './containers/Toolbar';
import Menu from './containers/Menu';
import Overlay from './components/Overlay';

const Revisions = lazy(() => import('./containers/Revisions'));
const NoteInfo = lazy(() => import('./containers/NoteInfo'));

export default function FrontPage() {
  const selectedNote = useSelector(getSelectedNote);
  const isNoteInfoVisible = useSelector(getNoteInfoVisibilityStatus);
  const isSidebarVisible = useSelector(getSidebarVisibilityStatus);
  const isMenuVisible = useSelector(getMenuVisibilityStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataAction());
  }, [dispatch]);

  return (
    <Suspense fallback={() => 'Loading...'}>
      <FrontPageContainer
        isNoteInfoVisible={isNoteInfoVisible}
        isMenuVisible={isMenuVisible}
      >
        <Helmet title='Simplenote' />
        <Menu />
        <ContentContainer>
          <Overlay />
          <LeftColumn visible={isSidebarVisible}>
            <SearchBar />
            <NotesList />
          </LeftColumn>
          <RightColumn>
            {selectedNote && <Revisions />}
            <Toolbar />
            <NoteEditor />
          </RightColumn>
        </ContentContainer>
        {isNoteInfoVisible && <NoteInfo note={selectedNote} />}
      </FrontPageContainer>
    </Suspense>
  );
}
