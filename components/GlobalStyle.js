import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${(props) => props.theme.fonts.primary};
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.dark};
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    margin-bottom: ${(props) => props.theme.spacings.medium};
  }

  h1 {
    font-size: ${(props) => props.theme.fontSizes.xlarge};
  }

  h2 {
    font-size: ${(props) => props.theme.fontSizes.large};
  }

  p {
    margin-bottom: ${(props) => props.theme.spacings.medium};
  }

  button {
    cursor: pointer;
    border: none;
    border-radius: ${(props) => props.theme.borders.radius};
    font-family: inherit;
    transition: all 0.2s ease;
    
    &:hover {
      opacity: ${(props) => props.theme.hover.opacity};
    }
  }

  input, textarea, select {
    font-family: inherit;
    border: 1px solid ${(props) => props.theme.colors.light};
    border-radius: ${(props) => props.theme.borders.radius};
    padding: ${(props) => props.theme.spacings.small};
    
    &:focus {
      outline: none;
      border-color: ${(props) => props.theme.colors.accent};
    }
  }
`;

export default GlobalStyle;
