import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ErrorMessage from './ErrorMessage';

const StyledTextField = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
  width: 100%;

  label {
    align-items: center;
    border: 1px solid #e6e6e6;
    display: flex;
    width: 100%;
  }

  span {
    color: gray;
    font-size: 0.8125rem;
    font-weight: 600;
    vertical-align: middle;
    text-transform: uppercase;
    padding: 0.5em 0.75em;
    width: 10.5em;
  }

  input {
    border: none;
    height: 2em;
    font-size: 143%;
    font-weight: 300;
    outline: none;
    padding: 0.25em 0.15em;
    width: 100%;
  }

  ${ErrorMessage} {
    font-size: 0.8rem;
    margin: 0;
    text-align: left;
  }
`;

const Label = ({ children, ...props }) => <Label {...props}>{children}</Label>;

Label.propTypes = {
  children: PropTypes.element.isRequired,
};

const TextField = ({
  field: { name, ...field }, form: { touched, errors }, label, ...props
}) => (
  <StyledTextField>
    <label htmlFor={name}>
      <span>{label}</span>
      <input name={name} {...field} {...props} />
    </label>
    {touched[name] && errors[name] && <ErrorMessage>{errors[name]}</ErrorMessage>}
  </StyledTextField>
);

TextField.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  }).isRequired,
  type: PropTypes.oneOf(['email', 'password', 'text']).isRequired,
  label: PropTypes.string.isRequired,
};

export default TextField;
