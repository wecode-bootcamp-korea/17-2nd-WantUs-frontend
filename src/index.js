import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
// import {Provider} from './context';
import GlobalStyle from './GlobalStyles';
import {ThemeProvider} from 'styled-components';
import theme from "./theme";
import './index.css';

ReactDOM.render(
  <>
   <GlobalStyle />
   <ThemeProvider theme={theme}>
    <Routes />
    </ThemeProvider>
  </>,
  document.getElementById('root')
);