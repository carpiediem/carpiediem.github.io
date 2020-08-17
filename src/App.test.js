import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Home screen, by default', () => {
  const { getByTestId } = render(<App />);
  const homeDiv = getByTestId('home');
  expect(homeDiv).toBeInTheDocument();
});
