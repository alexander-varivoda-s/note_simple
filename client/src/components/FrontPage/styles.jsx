import styled, { css } from 'styled-components';
import Container from '../Shared/components/Container';

export const TopBar = styled.div`
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.palette.borderColor};
  display: flex;
  flex: 0 0 3.5em;
  justify-content: space-between;
  padding: 0 1em;
  width: 100%;
`;

export const RightColumn = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
  position: relative;
`;

export const LeftColumn = styled.div`
  border-right: 1px solid #cdcdcd;
  display: flex;
  flex: 0 0 20.5em;
  flex-direction: column;
  transition: all 0.2s ease-in-out;
  margin-left: -20.5em;

  ${props =>
    props.visible &&
    css`
      margin-left: 0;
    `}
`;

export const FrontPageContainer = styled(Container)`
  display: flex;
  transition: all 0.2s ease-in-out;
  transform: translateX(0);
  
  ${props =>
    props.isMenuVisible &&
    css`
      transform: translateX(13.5em);
    `}

  ${props =>
    props.isNoteInfoVisible &&
    css`
      transform: translateX(-16.75em);
    `}
}
`;

export const ContentContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  height: 100vh;
`;
