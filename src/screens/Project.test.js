import React from 'react';
import { act, render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import Project from './Project';

function setScrollY(value) {
  Object.defineProperty(window, 'scrollY', {
    configurable: true,
    writable: true,
    value,
  });
}

afterEach(() => {
  setScrollY(0);
});

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

test('marks the nav as scrolled once the page is scrolled past the top', () => {
  jest.useFakeTimers();

  const { getByTestId } = render(
    <MemoryRouter initialEntries={[`/projects/gameofthrones`]}>
      <Route path="/projects/:id">
        <Project />
      </Route>
    </MemoryRouter>
  );

  const appBar = getByTestId('NavBar').firstChild;
  const initialClassName = appBar.className;

  setScrollY(100);
  act(() => {
    window.dispatchEvent(new Event('scroll'));
    jest.advanceTimersByTime(150);
  });

  expect(appBar.className).not.toBe(initialClassName);

  jest.useRealTimers();
});

test('logs and falls back to placeholder content when no write-up exists for the project', () => {
  const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

  render(
    <MemoryRouter initialEntries={[`/projects/does-not-exist`]}>
      <Route path="/projects/:id">
        <Project />
      </Route>
    </MemoryRouter>
  );

  expect(consoleError).toHaveBeenCalled();
  consoleError.mockRestore();
});
