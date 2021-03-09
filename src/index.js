import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
// import {Provider} from './context';
import GlobalStyle from './Styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import theme from './Styles/theme';

ReactDOM.render(
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme} />
    <Routes />
  </>,
  document.getElementById('root'),
);
