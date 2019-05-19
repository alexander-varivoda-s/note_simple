import React from 'react';
import styled, { keyframes } from 'styled-components';

import SVG from '../SVG';

const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const StyledPageLoader = styled.div`
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);

  svg {
    animation: ${spin} 2s linear infinite;
    vertical-align: middle;
  }
`;

export default function PageLoader() {
  return (
    <StyledPageLoader>
      <SVG name='spinner' color='#448ac9' size='50' />
    </StyledPageLoader>
  );
}
