import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Button from '../../../../components/Button';
import SVG from '../../../../components/SVG';
import { getFilter, getTags } from '../../selectors';

const StyledMenu = styled.div`
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

const OptionsWrapper = styled.div`
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  flex-direction: column;
  padding: 0.625em 0;
`;

const OptionContainer = styled.div`
  padding-left: 1em;
  ${Button} {
    font-size: 0.875em;
    font-weight: bold;
    margin: 0.6em 0;

    span {
      padding-left: 0.5em;
    }
  }
`;

const TagsListWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: 0.5em 1em;
`;

const TagsList = styled.ul`
  flex: 1 1 auto;
  overflow-y: scroll;
`;

const TagsListItem = styled.li`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 0.4em 0;

  ${Button} {
    display: none;
  }

  &:hover ${Button} {
    display: block;
  }
`;

const Tag = styled.div`
  font-size: 0.875em;
  height: 1.5714285714285714em;
  max-width: 9.142857142857142em;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TagsListTitle = styled.h1`
  font-size: 0.875em;
  font-weight: 600;
  margin: 2em 0 1em;
  text-transform: uppercase;
`;

function Menu(props) {
  const { filter, tags } = props;

  return (
    <StyledMenu>
      <OptionsWrapper>
        <OptionContainer>
          <Button>
            <SVG name='notes' size='22' color='#1e1e1e' />
            <span>All Notes</span>
          </Button>
        </OptionContainer>
        <OptionContainer>
          <Button>
            <SVG name='trash' size='22' color='#1e1e1e' />
            <span>Trash</span>
          </Button>
        </OptionContainer>
      </OptionsWrapper>
      <TagsListWrapper>
        <TagsListTitle>Tags</TagsListTitle>
        <TagsList>
          {tags.map(tag => (
            <TagsListItem key={tag._id}>
              <Tag>
                <span>{tag.name}</span>
              </Tag>
              <Button>
                <SVG name='cross-outline' color='#d94f4f' size='22' />
              </Button>
            </TagsListItem>
          ))}
        </TagsList>
      </TagsListWrapper>
    </StyledMenu>
  );
}

const mapStateToProps = state => ({
  filter: getFilter(state),
  tags: getTags(state),
});

export default connect(mapStateToProps)(Menu);
