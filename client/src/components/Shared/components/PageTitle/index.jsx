import styled from 'styled-components';

export default styled.h1`
  font-size: ${props => (props.fontSize ? props.fontSize : '2rem')};
  font-weight: 100;
  text-align: center;
`;
