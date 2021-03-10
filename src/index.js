import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import GlobalStyle from './Styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import BoardProvider from './BoardProvider';
import theme from './Styles/theme';

ReactDOM.render(
  <BoardProvider>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  </BoardProvider>,
  document.getElementById('root'),
);
