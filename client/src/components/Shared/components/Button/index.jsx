import styled, { css, keyframes } from 'styled-components';

const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const Button = styled.button`
  background-color: transparent;
  border: 2px solid;
  border-radius: 3px;
  font-family: ${({ theme }) => theme.font};
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.5;
  padding: 0.5em 0.75em;

  svg {
    vertical-align: middle;
  }

  &:not(:disabled) {
    cursor: pointer;
  }

  ${props =>
    props.type === 'submit' &&
    css`
      svg {
        animation: ${spin} 2s linear infinite;
      }
    `}

  ${props =>
    props.compact &&
    css`
      padding: 0.2em 1.286em;
    `}
`;

export const PrimaryButton = styled(Button)`
  background-color: #448ac9;
  border-color: #448ac9;
  color: #fff;
  width: 100%;

  &:active {
    background-color: #297cc5;
  }
`;

export const SecondaryButton = styled(Button)`
  background-color: transparent;
  border-color: #fff;
  color: #fff;
  transition: all 0.3s ease-in-out;

  &:active {
    background-color: #fff;
    color: #448ac9;
  }
`;

export const DangerButton = styled(SecondaryButton)`
  color: #d94f4f;
  border-color: #d94f4f;

  &:active {
    background: #d94f4f;
    color: #fff;
  }
`;

export const BorderlessButton = styled(Button)`
  border: none;
  font-size: 0.875em;
  font-weight: 600;

  ${props =>
    props.active &&
    css`
      color: #4895d9;

      svg {
        fill: #4895d9;
      }
    `}

  &:active {
    color: #20619b;

    svg {
      fill: #20619b;
    }
  }
`;

export const IconButton = styled(Button)`
  background-color: transparent;
  border: none;
  min-height: 2em;
  min-width: 2em;
  padding: 0;
`;

export default Button;
