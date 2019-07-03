import styled from 'styled-components';

export const StyledNotePreview = styled.div`
  border-bottom: 1px solid ${props => props.theme.notesList.borderBottomColor};
  overflow: hidden;
  padding: 0.625em 0;
  width: 100%;

  div,
  p {
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  p {
    color: gray;
    font-size: 0.875em;
    margin: 0;
  }
`;

export const Highlight = styled.span`
  color: #fff;
  background-color: ${props => props.theme.palette.main};
  border-radius: 2px;
`;
