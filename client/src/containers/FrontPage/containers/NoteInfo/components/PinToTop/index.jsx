import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { pinAction } from '../../../NotesList/actions';

export const StyledPinToTop = styled.div`
  align-items: center;
  display: flex;
  font-size: 0.875rem;
  justify-content: space-between;
  padding: 1.429em;
`;

class PinToTop extends PureComponent {
  static propTypes = {
    isChecked: PropTypes.bool.isRequired,
    pinToTop: PropTypes.func.isRequired,
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    isChecked: this.props.isChecked,
  };

  componentDidUpdate(prevProps, prevState) {
    const { isChecked } = this.state;

    if (prevState.isChecked !== isChecked) {
      const { pinToTop } = this.props;
      pinToTop(isChecked);
    }
  }

  handleChange = () => {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked,
    }));
  };

  render() {
    const { isChecked } = this.state;

    return (
      <StyledPinToTop>
        <label htmlFor='pin-to-top'>Pin to top</label>
        <input
          id='pin-to-top'
          type='checkbox'
          checked={isChecked}
          onChange={this.handleChange}
        />
      </StyledPinToTop>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  pinToTop: isChecked => dispatch(pinAction(isChecked, ownProps.noteId)),
});

export default connect(
  null,
  mapDispatchToProps
)(PinToTop);
