import React from 'react';
import PropTypes from 'prop-types';
import { CheckboxContainer } from '../../styles';

function Checkbox(props) {
  const { name, fieldLabel, label, ...rest } = props;

  return (
    <CheckboxContainer>
      {fieldLabel && <label htmlFor={name}>{fieldLabel}</label>}
      <div>
        <input type='checkbox' {...rest} />
        <span>{label}</span>
      </div>
    </CheckboxContainer>
  );
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  fieldLabel: PropTypes.string.isRequired,
};

export default Checkbox;
