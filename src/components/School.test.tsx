import { render } from "@testing-library/react";
import School from "./School";

test("renders provided years, degree, and color", () => {
  const { getByText } = render(
    <School
      years="2010 - 2014"
      degree="BSc Computer Science"
      color="secondary"
    />,
  );
  expect(getByText("2010 - 2014")).toBeInTheDocument();
  expect(getByText("BSc Computer Science")).toBeInTheDocument();
});

test("falls back to default years, degree, and color when omitted", () => {
  const { getByText } = render(<School />);
  expect(getByText("THEN - NOW")).toBeInTheDocument();
  expect(getByText("Doctor of Knockology")).toBeInTheDocument();
});
