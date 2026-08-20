import { render } from "@testing-library/react";
import SpeechBubble from "./SpeechBubble";

test("renders the provided text", () => {
  const { getByText } = render(<SpeechBubble text="Hey, there" />);
  expect(getByText("Hey, there")).toBeInTheDocument();
});
