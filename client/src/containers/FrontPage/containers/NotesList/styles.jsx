import styled, { css } from 'styled-components';
import { StyledNotePreview } from './components/NotePreview/styles';
import { StyledPinner } from './components/Pinner/styles';

// eslint-disable-next-line import/prefer-default-export
export const StyledNotesList = styled.div`
  border-right: 1px solid ${props => props.theme.palette.borderColor};
  flex: 1 1 auto;
  overflow-y: scroll;
  width: 100%;
`;

export const NotesListItem = styled.li`
  display: flex;
  padding: 0 0 0 0.625em;

  ${props =>
    props.selected &&
    css`
      ${StyledNotePreview} {
        div,
        p {
          color: ${props.theme.palette.main};
        }
      }
    `}

  ${StyledPinner} {
    visibility: hidden;

    span {
      & > span {
        visibility: hidden;
      }

      &:hover > span {
        background-color: ${props => props.theme.notesList.checkboxInnerHover};
        visibility: visible;
      }
    }

    ${props =>
      props.pinned &&
      css`
        visibility: visible;

        span {
          & > span {
            background-color: ${props.theme.notesList.checkboxPinnedInner};
            visibility: visible;
          }
        }
      `}

    ${props =>
      props.pinned &&
      props.selected &&
      css`
        span {
          border-color: ${props.theme.notesList.checkboxOuterPinnedActive};
          & > span {
            background-color: ${props.theme.notesList
              .checkboxInnerPinnedActive};
          }

          &:hover > span {
            background-color: ${props.theme.notesList
              .checkboxInnerPinnedActiveHover};
          }
        }
      `}
  }

  &:hover ${StyledPinner} {
    visibility: visible;
  }
`;
