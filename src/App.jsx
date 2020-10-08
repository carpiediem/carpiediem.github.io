import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Home from './screens/Home';
import Project from './screens/Project';

function App() {
  // https://coolors.co/006d77-83c5be-edf6f9-ffddd2-e29578
  // 006d77,83c5be,edf6f9,ffddd2,e29578
  const theme = createMuiTheme({
    palette: {
      primary: { main: '#006d77', light: '#83c5be' },
      secondary: { main: '#e29578', light: '#ffddd2' },
    },
    typography: {
      fontWeight: 400,
      fontFamily: [
        '"Open Sans"',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/projects/:id">
            <Project />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
