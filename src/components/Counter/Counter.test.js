import { fireEvent, render, screen } from "@testing-library/react";
import Counter from "./Counter";
import "@testing-library/jest-dom";

test("Renders the Counter component with initial value", () => {
  render(<Counter value="5" />);
  const text = screen.getByText("5");
  expect(text).toBeInTheDocument();
});

test("Invoke increment button click and counter value to be 6", () => {
  render(<Counter value="5" />);
  fireEvent.click(screen.getByTestId("incButton"));
  expect(screen.getByTestId("counterSpan")).toHaveTextContent("6");
});

test("Invoke decrement button click and counter value to be 4", () => {
  render(<Counter value="5" />);
  fireEvent.click(screen.getByTestId("decButton"));
  expect(screen.getByTestId("counterSpan")).toHaveTextContent("4");
});
