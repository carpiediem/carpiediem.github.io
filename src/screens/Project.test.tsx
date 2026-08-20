import { vi } from "vitest";
import { act, render } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import Project from "./Project";

function setScrollY(value: number) {
  Object.defineProperty(window, "scrollY", {
    configurable: true,
    writable: true,
    value,
  });
}

afterEach(() => {
  setScrollY(0);
});

test("includes NavBar component", () => {
  const { getByTestId } = render(
    <MemoryRouter initialEntries={[`/projects/gameofthrones`]}>
      <Route path="/projects/:id">
        <Project />
      </Route>
    </MemoryRouter>,
  );

  const navbarDiv = getByTestId("NavBar");
  expect(navbarDiv).toBeInTheDocument();
});

test("marks the nav as scrolled once the page is scrolled past the top", () => {
  vi.useFakeTimers();

  const { getByTestId } = render(
    <MemoryRouter initialEntries={[`/projects/gameofthrones`]}>
      <Route path="/projects/:id">
        <Project />
      </Route>
    </MemoryRouter>,
  );

  const appBar = getByTestId("NavBar").firstChild as HTMLElement | null;
  expect(appBar).toBeInTheDocument();
  const initialClassName = appBar!.className;

  setScrollY(100);
  act(() => {
    window.dispatchEvent(new Event("scroll"));
    vi.advanceTimersByTime(150);
  });

  expect(appBar!.className).not.toBe(initialClassName);

  vi.useRealTimers();
});

test("redirects home when no project matches the id", () => {
  const { queryByTestId } = render(
    <MemoryRouter initialEntries={[`/projects/does-not-exist`]}>
      <Route path="/projects/:id">
        <Project />
      </Route>
      <Route path="/" exact>
        <div data-testid="home-redirect" />
      </Route>
    </MemoryRouter>,
  );

  expect(queryByTestId("home-redirect")).toBeInTheDocument();
});
