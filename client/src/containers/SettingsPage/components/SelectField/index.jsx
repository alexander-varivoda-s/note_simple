import React from 'react';
import PropTypes from 'prop-types';
import { SelectContainer } from '../../styles';

export default function Select(props) {
  const { items, name, label, defaultValue, ...rest } = props;
  return (
    <SelectContainer>
      {label && <label htmlFor={name}>{label}</label>}
      <select name={name} value={defaultValue} {...rest}>
        {items.map(item => {
          const key = Array.isArray(item) ? item[0] : item;
          const value = Array.isArray(item) ? item[1] : item;

          return (
            <option key={key} value={key}>
              {value}
            </option>
          );
        })}
      </select>
    </SelectContainer>
  );
}

Select.propTypes = {
  items: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};
