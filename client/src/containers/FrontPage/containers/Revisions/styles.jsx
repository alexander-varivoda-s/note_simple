import styled, { css } from 'styled-components';
import Button from '../../../../components/Button';

export const StyledRevisions = styled.div`
  align-items: center;
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
  animation-direction: normal;
  background: ${({ theme }) => theme.palette.main};
  display: flex;
  flex-flow: column;
  height: 7.125em;
  justify-content: center;
  left: 0;
  padding: 0.625em 1.25em 1.25em;
  top: -7.125em;
  position: absolute;
  transition: top 0.5s ease-in-out;
  width: 100%;
  z-index: 1;

  ${props =>
    props.isVisible &&
    css`
      top: 0;
    `}
`;

export const SelectedRevision = styled.div`
  color: #fff;
  font-size: 0.875rem;
  margin-bottom: 0.5em;
`;

export const Range = styled.input`
  -webkit-appearance: none;
  background: transparent;
  margin: 0.625em 0 1em;
  max-width: 39.063em;
  width: 100%;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: white;
    border: 2px solid ${({ theme }) => theme.palette.main};
    border-radius: 50%;
    cursor: pointer;
    height: 1.125em;
    margin-top: -0.5em;
    width: 1.125em;
  }

  &::-webkit-slider-runnable-track {
    background: white;
    cursor: pointer;
    height: 2px;
  }

  &:focus {
    outline: none;
  }
`;

export const RestoreButton = styled(Button)`
  background: white;
  color: ${props => props.theme.palette.main};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  padding: 0.45em 1.25em;
`;

export const CancelButton = styled(Button)`
  border: 2px solid #fff;
  color: white;
  margin-right: 1em;
  padding: 0.3em 1.25em;
`;

export const Actions = styled.div`
  ${Button} {
    font-size: 0.75rem;
    border-radius: 3px;
  }
`;
