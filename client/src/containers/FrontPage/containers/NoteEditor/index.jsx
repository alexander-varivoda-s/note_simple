import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { noteEditAction, noteSaveAction } from './actions';
import TagsEditor from '../TagsEditor';
import { getSelectedNote } from '../../selectors';
import { getRevisionSelectorVisibilityStatus } from '../Revisions/selectors';

export const StyledNoteEditor = styled.div`
  animation-delay: 0.3s;
  animation-direction: normal;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding-top: 0;
  transition: padding-top 0.5s ease-in-out;

  ${props =>
    props.revisionSelectorVisible &&
    css`
      padding-top: 3.625em;
    `}

  textarea {
    background-color: transparent;
    border: none;
    height: 100%;
    font-family: ${props => props.theme.font};
    font-size: 1rem;
    line-height: 1.5;
    outline: none;
    padding: 1.5em;
    resize: none;
    width: 100%;
  }
`;

export const TextareaWrapper = styled.div`
  flex: 1 1 auto;
  margin: 0 auto;
  max-width: 48.75em;
  width: 100%;
`;

class NoteEditor extends PureComponent {
  static defaultProps = {
    selectedNote: null,
  };

  static propTypes = {
    selectedNote: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
      updated: PropTypes.string.isRequired,
      pinned: PropTypes.string,
      author: PropTypes.string.isRequired,
      is_deleted: PropTypes.bool.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
    handleSave: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    isRevisionSelectorVisible: PropTypes.bool.isRequired,
  };

  _textarea = React.createRef();

  _timeout = [];

  componentDidUpdate(prevProps) {
    const { selectedNote: prevSelectedNote } = prevProps;
    const { selectedNote: currentSelectedNote } = this.props;

    if (
      currentSelectedNote &&
      prevSelectedNote &&
      currentSelectedNote._id !== prevSelectedNote._id
    ) {
      this._textarea.current.focus();
    }
  }

  handleNoteEdit = e => {
    const { handleEdit } = this.props;
    const { value } = e.target;

    handleEdit(value);
  };

  handleKeyUp = () => {
    const {
      selectedNote: { _id, text },
      handleSave,
    } = this.props;

    if (this._timeout[_id]) {
      clearTimeout(this._timeout[_id]);
      this._timeout[_id] = null;
    }

    if (!this._timeout[_id]) {
      this._timeout[_id] = setTimeout(() => handleSave(text), 750);
    }
  };

  render() {
    const { selectedNote, isRevisionSelectorVisible } = this.props;

    if (!selectedNote) {
      return null;
    }

    return (
      <StyledNoteEditor revisionSelectorVisible={isRevisionSelectorVisible}>
        <TextareaWrapper>
          <textarea
            autoFocus
            value={selectedNote.text}
            onChange={this.handleNoteEdit}
            onKeyUp={this.handleKeyUp}
            ref={this._textarea}
            spellCheck={false}
          />
        </TextareaWrapper>
        <TagsEditor />
      </StyledNoteEditor>
    );
  }
}

const mapStateToProps = state => ({
  selectedNote: getSelectedNote(state),
  isRevisionSelectorVisible: getRevisionSelectorVisibilityStatus(state),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { selectedNote } = stateProps;
  const { dispatch } = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
    handleSave: text => dispatch(noteSaveAction(text, selectedNote._id)),
    handleEdit: text => dispatch(noteEditAction(text, selectedNote._id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(NoteEditor);
