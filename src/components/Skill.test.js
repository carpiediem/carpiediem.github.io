import React from 'react';
import { render } from '@testing-library/react';
import Skill from './Skill';

test('renders provided name and description', () => {
  const { getByText } = render(
    <Skill iconClass="fas fa-code" name="JavaScript" description="Very good at it." />
  );
  expect(getByText('JavaScript')).toBeInTheDocument();
  expect(getByText('Very good at it.')).toBeInTheDocument();
});

test('falls back to default name and description when omitted', () => {
  const { getByText } = render(<Skill />);
  expect(getByText('Skill')).toBeInTheDocument();
  expect(getByText('I am awesome.')).toBeInTheDocument();
});
