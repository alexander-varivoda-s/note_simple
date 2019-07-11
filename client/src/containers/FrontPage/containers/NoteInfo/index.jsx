import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  StyledNoteInfo,
  Header,
  HeaderTop,
  Modified,
  PinToTop,
} from './styles';
import Button from '../../../../components/Button';
import SVG from '../../../../components/SVG';
import { toggleNoteVisibilityAction } from '../Toolbar/actions';
import { pinAction } from '../NotesList/actions';

function formatDate(dateString) {
  return new Date(dateString).toLocaleString('en-US', {
    hour12: true,
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function NoteInfo(props) {
  const { note } = props;

  const [isChecked, setIsChecked] = useState(!!note.pinned);

  const dispatch = useDispatch();

  function clickHandler() {
    dispatch(toggleNoteVisibilityAction(false));
  }

  function changeHandler() {
    setIsChecked(!isChecked);
  }

  useEffect(() => {
    if ((!!note.pinned && !isChecked) || (!note.pinned && isChecked)) {
      dispatch(pinAction(isChecked, note._id));
    }
  }, [isChecked, note, dispatch]);

  return (
    <StyledNoteInfo>
      <Header>
        <HeaderTop>
          <h2>Info</h2>
          <Button onClick={clickHandler}>
            <SVG name='cross' size='32' />
          </Button>
        </HeaderTop>
        <Modified>
          <div>Modified</div>
          <p>{formatDate(note.updated)}</p>
        </Modified>
      </Header>
      <PinToTop>
        <label htmlFor='pin-to-top'>Pin to top</label>
        <input
          id='pin-to-top'
          type='checkbox'
          checked={isChecked}
          onChange={changeHandler}
        />
      </PinToTop>
    </StyledNoteInfo>
  );
}

NoteInfo.propTypes = {
  note: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    updated: PropTypes.string.isRequired,
    pinned: PropTypes.string,
    author: PropTypes.string.isRequired,
    is_deleted: PropTypes.bool.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
