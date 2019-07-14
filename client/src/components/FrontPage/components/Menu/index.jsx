import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BorderlessButton,
  IconButton,
} from '../../../Shared/components/Button';
import SVG from '../../../Shared/components/SVG';
import { getFilter, getSelectedNote, getTags } from '../../selectors';
import { filterNotesAction, toggleMenuVisibilityAction } from './actions';
import { tagDeleteAction } from '../TagsEditor/actions';
import { unselectNoteAction } from '../NotesList/actions';
import {
  StyledMenu,
  OptionsWrapper,
  OptionContainer,
  Tag,
  TagsList,
  TagsListItem,
  TagsListTitle,
  TagsListWrapper,
} from './styles';

export default function Menu() {
  const filter = useSelector(getFilter);
  const tags = useSelector(getTags);
  const selectedNote = useSelector(getSelectedNote);

  const dispatch = useDispatch();

  function handleClick(e) {
    const { filter: selectedFilter } = e.currentTarget.dataset;

    dispatch(filterNotesAction(selectedFilter));
    if (selectedNote) {
      dispatch(unselectNoteAction());
    }
    dispatch(toggleMenuVisibilityAction(false));
  }

  function performTagDelete(e) {
    const {
      dataset: { id },
    } = e.currentTarget;
    dispatch(tagDeleteAction(id));
  }

  return (
    <StyledMenu>
      <OptionsWrapper>
        <OptionContainer>
          <BorderlessButton
            active={filter === 'all'}
            data-filter='all'
            onClick={handleClick}
          >
            <SVG name='notes' size='22' color='#1e1e1e' />
            <span>All Notes</span>
          </BorderlessButton>
        </OptionContainer>
        <OptionContainer>
          <BorderlessButton
            active={filter === 'trash'}
            data-filter='trash'
            onClick={handleClick}
          >
            <SVG name='trash' size='22' color='#1e1e1e' />
            <span>Trash</span>
          </BorderlessButton>
        </OptionContainer>
      </OptionsWrapper>
      <TagsListWrapper>
        <TagsListTitle>Tags</TagsListTitle>
        <TagsList>
          {tags.map(tag => (
            <TagsListItem key={tag._id}>
              <Tag data-filter={tag.name} onClick={handleClick}>
                <span>{tag.name}</span>
              </Tag>
              <IconButton onClick={performTagDelete} data-id={tag._id}>
                <SVG name='cross-outline' color='#d94f4f' size='22' />
              </IconButton>
            </TagsListItem>
          ))}
        </TagsList>
      </TagsListWrapper>
    </StyledMenu>
  );
}
