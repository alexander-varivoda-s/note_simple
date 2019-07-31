import React from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

import {
  getFilter,
  getMenuVisibilityStatus,
  getNoteInfoVisibilityStatus,
  getSelectedNote,
  getSidebarVisibilityStatus,
  getSortedNotes,
} from './selectors';
import SearchBar from './components/Search';
import NotesList from './components/NotesList';
import NoteEditor from './components/NoteEditor';
import Toolbar from './components/Toolbar';
import Menu from './components/Menu';
import Overlay from './components/Overlay';
import {
  TopBar,
  FrontPageContainer,
  ContentContainer,
  LeftColumn,
  RightColumn,
} from './styles';
import MenuToggle from './components/MenuToggle';
import AddNote from './components/AddNote';
import Revisions from './components/Revisions';
import NoteInfo from './components/NoteInfo';
import EmptyTrash from './components/EmptyTrash';

export default function FrontPage() {
  const selectedNote = useSelector(getSelectedNote);
  const isNoteInfoVisible = useSelector(getNoteInfoVisibilityStatus);
  const isSidebarVisible = useSelector(getSidebarVisibilityStatus);
  const isMenuVisible = useSelector(getMenuVisibilityStatus);
  const filter = useSelector(getFilter);
  const notes = useSelector(getSortedNotes);

  return (
    <FrontPageContainer
      isNoteInfoVisible={isNoteInfoVisible}
      isMenuVisible={isMenuVisible}
    >
      <Helmet title='Simplenote' />
      <Menu />
      <ContentContainer>
        <Overlay />
        <LeftColumn visible={isSidebarVisible}>
          <TopBar>
            <MenuToggle />
            <SearchBar />
            <AddNote />
          </TopBar>
          <NotesList />
          {filter === 'TRASH' && !!notes.length && <EmptyTrash />}
        </LeftColumn>
        <RightColumn>
          <Toolbar />
          <NoteEditor />
          {selectedNote && <Revisions />}
        </RightColumn>
      </ContentContainer>
      {isNoteInfoVisible && <NoteInfo note={selectedNote} />}
    </FrontPageContainer>
  );
}
