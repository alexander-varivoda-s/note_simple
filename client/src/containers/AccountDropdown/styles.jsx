import styled from 'styled-components';

export const Dropdown = styled.div`
  position: relative;
`;

export const Header = styled.div`
  padding: 0.571em 1.143em;

  div {
    color: #24292e;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const ListContainer = styled.nav`
  background-color: #fff;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 4px;
  box-shadow: 0 3px 12px rgba(27, 31, 35, 0.15);
  font-size: 0.875rem;
  left: auto;
  max-width: 12.857em;
  padding-bottom: 0.571em;
  position: absolute;
  top: 2.8em;
  right: -0.15em;
  z-index: 1;

  &::before {
    content: '';
    border: 8px solid transparent;
    border-bottom-color: rgba(27, 31, 35, 0.15);
    display: inline-block;
    left: auto;
    right: 0.643em;
    position: absolute;
    top: -1.143em;
  }

  &::after {
    border: 7px solid transparent;
    border-bottom-color: #fff;
    content: '';
    display: inline-block;
    left: auto;
    position: absolute;
    top: -1em;
    right: 0.714em;
  }
`;

export const LinksList = styled.ul`
  border-top: 1px solid #e1e4e8;

  li {
    margin: 0;
  }

  a {
    display: block;
    overflow: hidden;
    padding: 0.286em 1.143em;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover {
      background-color: #eef3f8;
    }
  }
`;
