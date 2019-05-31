import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    box-sizing: border-box;
  }

  *, ::after, ::before {
    box-sizing: inherit;
  }

  body {
    font-family: ${({ theme }) => theme.font};
    font-size: 1rem;
    height: 100vh;
    margin: 0;
    overflow: hidden;
    padding: 0;
  }

  #root {
    height: 100vh;
  }

  a {
    color: ${({ theme }) => theme.palette.main};
    text-decoration: none;
  }
  
  ul {
    margin: 0;
    padding: 0;
  }
`;
