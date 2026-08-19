import React from "react";
import { vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Portfolio from "./Portfolio";

vi.mock("../content/projects.json", () => ({
  default: [
    {
      id: "featured-project",
      img: "/img/featured.png",
      title: "Featured Project",
      tags: ["web", "featured"],
      featured: true,
      demo: "https://example.com/demo",
      github: "https://github.com/example/featured-project",
    },
    {
      id: "plain-project",
      img: "/img/plain.png",
      title: "Plain Project",
      featured: false,
    },
  ],
}));

test("renders a featured project with tags, a demo link, and a GitHub link", () => {
  const { getByText, container } = render(
    <MemoryRouter>
      <Portfolio />
    </MemoryRouter>,
  );
  expect(getByText("Featured Project")).toBeInTheDocument();
  expect(container.querySelector(".tags").textContent).toBe("featured, web");
  expect(
    container.querySelector('a[href="https://example.com/demo"]'),
  ).toBeInTheDocument();
  expect(
    container.querySelector(
      'a[href="https://github.com/example/featured-project"]',
    ),
  ).toBeInTheDocument();
});

test("renders a non-featured project without tags, demo, or GitHub links", () => {
  const { getByText } = render(
    <MemoryRouter>
      <Portfolio />
    </MemoryRouter>,
  );
  expect(getByText("Plain Project")).toBeInTheDocument();
});

test("scrolls to the top when the zoom link is clicked", () => {
  window.scrollTo = vi.fn();
  const { container } = render(
    <MemoryRouter>
      <Portfolio />
    </MemoryRouter>,
  );

  fireEvent.click(
    container.querySelector('a[href="/projects/featured-project"]'),
  );

  expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
});
