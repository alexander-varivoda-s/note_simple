import styled from 'styled-components';

export default styled.div`
  left: 50%;
  padding: 0.625em;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: ${props => (props.width ? props.width : '20em')};
`;
