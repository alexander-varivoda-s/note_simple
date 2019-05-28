import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const StyledPinner = styled.div`
  margin: 0.9em 1.25em 0 0;

  span {
    border: 2px solid ${props => props.theme.notesList.checkboxOuter};
    border-radius: 50%;
    height: 14px;
    position: absolute;
    width: 14px;
    
    & > span {
      background-color: ${props => props.theme.notesList.checkboxInner};
      border-radius: 50%;
      border: none;
      height: 8px;
      left: 1px;
      position: absolute;
      top: 1px;
      width: 8px;
    }
  }
`;

export default class Pinner extends PureComponent {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    noteId: PropTypes.string.isRequired,
  };

  static getDerivedStateFromProps(props, state) {
    const { isPinned } = props;
    const { init } = state;

    if (typeof isPinned !== 'undefined' && !init) {
      return {
        checked: isPinned,
        init: true,
      };
    }

    return null;
  }

  state = {
    init: false,
    checked: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { checked } = this.state;
    if (prevState.checked !== checked) {
      const { handleChange, noteId } = this.props;
      handleChange(checked, noteId);
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      checked: !prevState.checked,
    }));
  };

  handleKeydown = (e) => {
    if (e.keyCode === 32) {
      this.toggle(e);
    }
  };

  render() {
    const { checked } = this.state;

    return (
      <StyledPinner>
        <span
          role='checkbox'
          aria-checked={checked}
          onClick={this.toggle}
          tabIndex='0'
          onKeyDown={this.handleKeydown}
        >
          <span />
        </span>
      </StyledPinner>
    );
  }
}
