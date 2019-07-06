import React from 'react';
import PropTypes from 'prop-types';
import icons from './icons.svg';

export default function Icon(props) {
  const { name, size, color, ...rest } = props;
  return (
    <svg
      className={`icon-svg icon-${name}`}
      fill={color}
      width={size}
      height={size}
      {...rest}
    >
      <use xlinkHref={`${icons}#icon-${name}`} />
    </svg>
  );
}

Icon.defaultProps = {
  size: '24px',
  color: '#4895d9',
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
};
