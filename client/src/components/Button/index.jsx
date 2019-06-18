import styled, { css, keyframes } from 'styled-components';

const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export default styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  padding: 0;

  &:not(:disabled) {
    cursor: pointer;
  }

  svg {
    vertical-align: middle;
  }

  /* Submit button */
  ${props =>
    props.submit &&
    css`
      background-color: ${({ theme }) => theme.palette.main};
      border: none;
      border-radius: 3px;
      color: #fff;
      cursor: pointer;
      font-family: ${({ theme }) => theme.font};
      font-size: 0.875rem;
      font-weight: 600;
      line-height: 1.5;
      min-height: 3em;
      padding: 0.5em 0.75em;
      width: 100%;

      &:active {
        background-color: ${({ theme }) => theme.palette.active};
      }

      svg {
        animation: ${spin} 2s linear infinite;
      }
    `}

  ${props =>
    props.active &&
    css`
      color: ${props.theme.palette.main};
      svg {
        fill: ${props.theme.palette.main};
      }
    `}
`;
