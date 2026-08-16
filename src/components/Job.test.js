import React from 'react';
import { render } from '@testing-library/react';
import Job from './Job';

test('renders provided years, role, and company', () => {
  const { getByText } = render(
    <Job years="2020 - NOW" company="Acme" role="Engineer" logo="Acme" />
  );
  expect(getByText('2020 - NOW')).toBeInTheDocument();
  expect(getByText('Engineer')).toBeInTheDocument();
});

test('falls back to default years, role, and description when omitted', () => {
  const { getByText } = render(<Job />);
  expect(getByText('THEN - NOW')).toBeInTheDocument();
  expect(getByText('CEO')).toBeInTheDocument();
});
