import React from "react";
import { render } from "@testing-library/react";
import NavBar from "./NavBar";

const originalInnerWidth = window.innerWidth;

function setInnerWidth(width) {
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    writable: true,
    value: width,
  });
}

afterEach(() => {
  setInnerWidth(originalInnerWidth);
});

test("renders text labels and no active section when wide and at the top", () => {
  setInnerWidth(1024);
  const { getByTestId, getByText } = render(<NavBar />);
  expect(getByTestId("NavBar")).toBeInTheDocument();
  expect(getByText("About")).toBeInTheDocument();
  expect(getByText("Education")).toBeInTheDocument();
});

test("renders icons instead of text labels on narrow screens", () => {
  setInnerWidth(400);
  const { queryByText } = render(<NavBar />);
  expect(queryByText("About")).not.toBeInTheDocument();
});

test.each(["about", "skills", "portfolio", "experience", "education"])(
  'highlights the "%s" section when it is the current section',
  (section) => {
    setInnerWidth(1024);
    const { getByText } = render(<NavBar section={section} />);
    expect(getByText("About")).toBeInTheDocument();
    expect(getByText("Skills")).toBeInTheDocument();
    expect(getByText("Portfolio")).toBeInTheDocument();
    expect(getByText("Experience")).toBeInTheDocument();
    expect(getByText("Education")).toBeInTheDocument();
  },
);
