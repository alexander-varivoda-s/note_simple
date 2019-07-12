import React from 'react';
import PropTypes from 'prop-types';
import { Header, SettingToggle } from './styles';

export default function SettingHeader(props) {
  const { title, isOpen, clickHandler } = props;

  return (
    <Header>
      <h2>{title}</h2>
      <SettingToggle onClick={clickHandler}>
        {isOpen ? 'Hide' : 'Edit'}
      </SettingToggle>
    </Header>
  );
}

SettingHeader.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func.isRequired,
};
