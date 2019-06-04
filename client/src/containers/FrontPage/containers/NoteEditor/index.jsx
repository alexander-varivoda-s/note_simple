import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { noteSaveAction } from './actions';
import TagsEditor from '../TagsEditor';

export const StyledNoteEditor = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  max-width: 48.75em;

  textarea {
    background-color: transparent;
    border: none;
    flex: 1 1 auto;
    font-family: ${props => props.theme.font};
    font-size: 1rem;
    line-height: 1.5;
    outline: none;
    padding: 1.5em;
    resize: none;
    width: 100%;
  }
`;

class NoteEditor extends PureComponent {
  static propTypes = {
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
    handleSave: PropTypes.func.isRequired,
  };

  static getDerivedStateFromProps(props, state) {
    const { note } = props;
    const { prevNoteId } = state;

    if (note && note._id !== prevNoteId) {
      return {
        text: note.text,
        prevNoteId: note._id,
      };
    }

    return null;
  }

  state = {
    text: '',
    prevNoteId: null,
  };

  _textarea = React.createRef();

  _timeout = [];

  componentDidUpdate(prevProps) {
    const { note: prevNote } = prevProps;
    const { note: currentNote } = this.props;

    if (prevNote && currentNote._id !== prevNote._id) {
      this._textarea.current.focus();
    }
  }

  handleNoteEdit = e => {
    const { value } = e.target;

    this.setState({
      text: value,
    });
  };

  handleKeyUp = () => {
    const {
      note: { _id },
      handleSave,
    } = this.props;
    const { text } = this.state;

    if (this._timeout[_id]) {
      clearTimeout(this._timeout[_id]);
      this._timeout[_id] = null;
    }

    if (!this._timeout[_id]) {
      this._timeout[_id] = setTimeout(() => handleSave(text), 750);
    }
  };

  render() {
    const { text } = this.state;

    return (
      <StyledNoteEditor>
        <textarea
          autoFocus
          value={text}
          onChange={this.handleNoteEdit}
          onKeyUp={this.handleKeyUp}
          ref={this._textarea}
        />
        <TagsEditor />
      </StyledNoteEditor>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mergeProps = (stateProps, { dispatch }, { note }) => ({
  note,
  handleSave: text => dispatch(noteSaveAction(text, note._id)),
});

export default connect(
  null,
  mapDispatchToProps,
  mergeProps
)(NoteEditor);
