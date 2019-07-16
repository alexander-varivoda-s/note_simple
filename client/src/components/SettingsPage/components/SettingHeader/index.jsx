import React from 'react';
import PropTypes from 'prop-types';
import { Header } from './styles';
import { BorderlessButton } from '../../../Shared/components/Button';

export default function SettingHeader(props) {
  const { title, isOpen, clickHandler } = props;

  return (
    <Header>
      <h2>{title}</h2>
      <BorderlessButton onClick={clickHandler}>
        {isOpen ? 'Hide' : 'Edit'}
      </BorderlessButton>
    </Header>
  );
}

SettingHeader.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func.isRequired,
};
