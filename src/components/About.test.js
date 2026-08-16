import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import About from './About';

beforeEach(() => {
  global.ga.mockClear();
});

test('renders the About section', () => {
  const { getByTestId } = render(<About />);
  expect(getByTestId('About')).toBeInTheDocument();
});

test('tracks a GA event when the resume download button is clicked', () => {
  const { getByText } = render(<About />);
  fireEvent.click(getByText('Download Resume'));
  expect(global.ga).toHaveBeenCalledWith('send', 'event', 'File', 'Download', 'Resume');
});

test('tracks a GA event when the email address is clicked', () => {
  const { getByText } = render(<About />);
  fireEvent.click(getByText('ryan.sl.carpenter@gmail.com'));
  expect(global.ga).toHaveBeenCalledWith('send', 'event', 'Link', 'Click', 'Email Address');
});
