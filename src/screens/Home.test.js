import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

test('includes NavBar, About, Skills, Portfolio, Experience, & Education components', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  const navbarDiv = getByTestId('NavBar');
  expect(navbarDiv).toBeInTheDocument();

  const aboutDiv = getByTestId('About');
  expect(aboutDiv).toBeInTheDocument();

  const skillsDiv = getByTestId('Skills');
  expect(skillsDiv).toBeInTheDocument();

  const portfolioDiv = getByTestId('Portfolio');
  expect(portfolioDiv).toBeInTheDocument();

  const experienceDiv = getByTestId('Experience');
  expect(experienceDiv).toBeInTheDocument();

  const educationDiv = getByTestId('Education');
  expect(educationDiv).toBeInTheDocument();
});
