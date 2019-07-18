import styled from 'styled-components';
import { BorderlessButton } from '../../../Shared/components/Button';

// eslint-disable-next-line import/prefer-default-export
export const StyledEmptyTrash = styled.div`
  align-items: center;
  border-top: 1px solid #cdcdcd;
  display: flex;
  justify-content: center;
  padding: 0.625em 1.25em;

  ${BorderlessButton} {
    color: #d94f4f;

    &:active {
      color: #a02222;
    }
  }
`;
