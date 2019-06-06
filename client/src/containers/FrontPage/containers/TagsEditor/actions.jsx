import {
  TAG_CREATE_REQUEST,
  TAG_DELETE_REQUEST,
  TAG_REQUEST,
  UNTAG_REQUEST,
} from './constants';

export const createTagAction = name => ({
  type: TAG_CREATE_REQUEST,
  payload: {
    name,
  },
});

export const tagNoteAction = ({ tagId = null, name = '' }) => ({
  type: TAG_REQUEST,
  payload: {
    tagId,
    name,
  },
});

export const untagNoteAction = (noteId, tagId) => ({
  type: UNTAG_REQUEST,
  payload: {
    noteId,
    tagId,
  },
});

export const tagDeleteAction = tagId => ({
  type: TAG_DELETE_REQUEST,
  payload: {
    tagId,
  },
});
