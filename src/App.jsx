import "core-js/stable";
import "regenerator-runtime/runtime";
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import Home from "./screens/Home";
import { theme } from "./theme";

const Project = lazy(() => import("./screens/Project"));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/projects/:id">
            <Suspense fallback={null}>
              <Project />
            </Suspense>
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
