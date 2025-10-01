import { ThemeProvider } from 'styled-components';
import makeTheme from '../shared-components/utils/makeTheme';
import GlobalStyle from '../components/GlobalStyle';

const theme = makeTheme();

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
