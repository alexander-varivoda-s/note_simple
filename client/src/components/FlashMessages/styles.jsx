import styled, { css } from 'styled-components';

const styleByType = type => {
  switch (type) {
    case 'warning':
      return css`
        color: #8a6d3b;
        background-color: #fcf8e3;
        border-color: #faebcc;
      `;

    case 'error':
      return css`
        color: #a94442;
        background-color: #f2dede;
        border-color: #ebccd1;
      `;

    default:
      return css`
        color: #3c763d;
        background-color: #dff0d8;
        border-color: #d6e9c6;
      `;
  }
};

export const FlashMessage = styled.div`
  line-height: 1.5;
  margin-bottom: 1.5em;
  padding: 0.313em 0.625em;
  ${props => styleByType(props.type)}
`;

export const StyledFlashMessages = styled.div`
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin: 0.313em 0;
  }
`;
