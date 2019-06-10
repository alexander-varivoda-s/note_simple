import styled, { css } from 'styled-components';

export default styled.div`
  display: flex;
  flex: 0 0 300px;
  flex-direction: column;
  transition: all 0.2s ease-in-out;
  margin-left: -18.75em;

  ${props =>
    props.visible &&
    css`
      margin-left: 0;
    `}
`;
