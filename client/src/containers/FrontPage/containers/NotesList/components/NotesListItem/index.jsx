import styled, { css } from 'styled-components';
import { StyledPinner } from '../Pinner';

export default styled.li`
  display: flex;
  padding: 0 0 0 0.625em;
  
  ${StyledPinner}{
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
    
    ${props => props.pinned && css`
      visibility: visible;
      
      span {
        & > span {
          background-color: ${props.theme.notesList.checkboxPinnedInner};
          visibility: visible;
        }
      }
    `}
    
    ${props => props.pinned && props.active && css`
      span {
        border-color: ${props.theme.notesList.checkboxOuterPinnedActive};
        & > span {
          background-color: ${props.theme.notesList.checkboxInnerPinnedActive};
        }
        
        &:hover > span {
          background-color: ${props.theme.notesList.checkboxInnerPinnedActiveHover};
        }
      }
    `}
  }
  
  &:hover ${StyledPinner}{
    visibility: visible;
  }
`;
