import styled from 'styled-components';

export const StyledNoteInfo = styled.div`
  border-left: 1px solid ${props => props.theme.palette.borderColor};
  height: 100%;
  left: 100%;
  position: absolute;
  top: 0;
  width: 16.75em;

  & > div {
    border-top: 1px solid ${props => props.theme.palette.borderColor};
  }
`;

export const Header = styled.header`
  padding: 0 1.25em;
`;

export const HeaderTop = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 1em 0 0.5em;

  h2 {
    display: inline;
    font-size: 0.75rem;
    line-height: 1;
    margin: 0;
    text-transform: uppercase;
  }
`;

export const Modified = styled.div`
  font-size: 0.875rem;

  p {
    color: gray;
    margin: 0.8em 0;
  }
`;

export const PinToTop = styled.div`
  align-items: center;
  display: flex;
  font-size: 0.875rem;
  justify-content: space-between;
  padding: 1.429em;
`;
