import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import SVG from '../../components/SVG';
import Button from '../../components/Button';
import { Dropdown, ListContainer, Header, LinksList } from './styles';

export default function AccountDropdown(props) {
  const { email, items } = props;
  const dropdown = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleDocumentClick(e) {
      if (isVisible && !dropdown.current.contains(e.target)) {
        setIsVisible(false);
      }
    }
    document.addEventListener('click', handleDocumentClick);

    return () => document.removeEventListener('click', handleDocumentClick);
  }, [isVisible]);

  function toggleDropdown() {
    setIsVisible(!isVisible);
  }

  return (
    <Dropdown ref={dropdown}>
      <Button onClick={toggleDropdown}>
        <SVG name='user' size='18' />
      </Button>
      {isVisible && (
        <ListContainer>
          <Header>
            Signed in as
            <div>{email}</div>
          </Header>
          <LinksList>
            {items.map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={i}>{item}</li>
            ))}
          </LinksList>
        </ListContainer>
      )}
    </Dropdown>
  );
}

AccountDropdown.propTypes = {
  email: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.element).isRequired,
};
