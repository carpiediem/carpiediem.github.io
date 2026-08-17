import React from "react";
import { render } from "@testing-library/react";
import Introduction from "./Introduction";

test("renders provided name and role", () => {
  const { getByText } = render(
    <Introduction name="Jane Doe" role="Astronaut" />,
  );
  expect(getByText("Jane Doe")).toBeInTheDocument();
  expect(getByText("Astronaut")).toBeInTheDocument();
});

test("falls back to default name and role when omitted", () => {
  const { getByText } = render(<Introduction />);
  expect(getByText("John Smith")).toBeInTheDocument();
  expect(getByText("Human Person")).toBeInTheDocument();
});
