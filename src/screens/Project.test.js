import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import Project from './Project';

// TBD: set id URL parameter
test('includes NavBar component', () => {
  const { getByTestId } = render(
    <MemoryRouter initialEntries={[`/projects/gameofthrones`]}>
      <Route path="/projects/:id">
        <Project />
      </Route>
    </MemoryRouter>
  );

  const navbarDiv = getByTestId('NavBar');
  expect(navbarDiv).toBeInTheDocument();
});
