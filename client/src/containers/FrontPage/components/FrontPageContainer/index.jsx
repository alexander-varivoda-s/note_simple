import styled, { css } from 'styled-components';

import Container from '../../../../components/Container';

export default styled(Container)`
  display: flex;
  transition: all 0.2s ease-in-out;
  transform: translateX(0);

  ${props =>
    props.isNoteInfoVisible &&
    css`
      transform: translateX(-16.75em);
    `}
`;
