import styled from 'styled-components';
import {
  BorderlessButton,
  IconButton,
} from '../../../Shared/components/Button';

export const StyledMenu = styled.div`
  border-right: 1px solid #e6e6e6;
  display: flex;
  height: 100%;
  flex-direction: column;
  left: 0;
  margin-left: -13.5em;
  position: absolute;
  top: 0;
  transition: all 0.2s ease-in-out;
  width: 13.5em;
`;

export const OptionsWrapper = styled.div`
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  flex-direction: column;
  padding: 0.625em 0;
`;

export const OptionContainer = styled.div`
  padding-left: 1em;

  ${BorderlessButton} {
    span {
      padding-left: 0.5em;
    }
  }
`;

export const TagsListWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: 0.5em 1em;
`;

export const TagsList = styled.ul`
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const TagsListItem = styled.li`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 0.4em 0;

  ${IconButton} {
    display: none;
  }

  &:hover ${IconButton} {
    display: block;
    min-height: 0;
    min-width: 0;
  }
`;

export const Tag = styled.div`
  font-size: 0.875em;
  height: 1.5714285714285714em;
  max-width: 9.142857142857142em;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TagsListTitle = styled.h1`
  font-size: 0.875em;
  font-weight: 600;
  margin: 2em 0 1em;
  text-transform: uppercase;
`;
