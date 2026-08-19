import React from "react";
import { render } from "@testing-library/react";
import { vi } from "vitest";
import App from "./App";
import projects from "./content/projects.json";

test("renders Home screen, by default", () => {
  const { getByTestId } = render(<App />);
  const homeDiv = getByTestId("home");
  expect(homeDiv).toBeInTheDocument();
});

// Guards against regressions like React error #130 (invalid element
// type - e.g. an icon import resolving to a module object instead of
// a component), which silently render a blank page instead of
// throwing. This checks for that failure class specifically, rather
// than requiring zero console output, since unrelated deprecation
// warnings are expected noise on older dependency versions.
function expectNoInvalidElementTypeErrors(path) {
  const spy = vi.spyOn(console, "error").mockImplementation(() => {});
  window.history.pushState({}, "", path);
  render(<App />);
  const invalidElementErrors = spy.mock.calls.filter(([message]) =>
    String(message).includes("Element type is invalid"),
  );
  expect(invalidElementErrors).toEqual([]);
  spy.mockRestore();
}

test("renders the home page without invalid element type errors", () => {
  expectNoInvalidElementTypeErrors("/");
});

test("renders a project page without invalid element type errors", () => {
  expectNoInvalidElementTypeErrors(`/projects/${projects[0].id}`);
});
