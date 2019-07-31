import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  StyledNoteInfo,
  Header,
  HeaderTop,
  Modified,
  PinToTop,
} from './styles';
import { IconButton } from '../../../Shared/components/Button';
import SVG from '../../../Shared/components/SVG';
import { pin, unpin } from '../NotesList/actions';
import { toggleNoteInfo } from './actions';

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

  const dispatch = useDispatch();

  function clickHandler() {
    dispatch(toggleNoteInfo(false));
  }

  function changeHandler(e) {
    const { checked } = e.target;

    if (checked) {
      dispatch(pin(note._id));
    } else {
      dispatch(unpin(note._id));
    }
  }

  return (
    <StyledNoteInfo>
      <Header>
        <HeaderTop>
          <h2>Info</h2>
          <IconButton onClick={clickHandler}>
            <SVG name='cross' size='32' />
          </IconButton>
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
          checked={!!note.pinned}
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
