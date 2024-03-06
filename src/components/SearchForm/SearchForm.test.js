import { fireEvent, render, screen } from "@testing-library/react";
import SearchForm from "./SearchForm";
import "@testing-library/jest-dom";

test("Renders input with initial value passed in props", () => {
  render(<SearchForm initValue="Avengers" />);
  expect(screen.getByTestId("searchInput")).toHaveValue("Avengers");
});

test('After typing to the input and a "click" event on the Submit button, the "onChange" prop is called with proper value', async () => {
  const handleSearch = jest.fn();
  const expectedValue = "Avengers The Mighty Warriors";
  render(<SearchForm initValue="Avengers" onSearch={handleSearch} />);
  await fireEvent.change(screen.getByTestId("searchInput"), {
    target: { value: expectedValue },
  });
  await fireEvent.click(screen.getByTestId("searchBtn"));
  expect(handleSearch).toHaveBeenCalledWith(expectedValue);
});

test('After typing to the input and an "enter" event, the "onChange" prop is called with proper value', async () => {
  const handleSearch = jest.fn();
  const expectedValue = "Avengers The Mighty Warriors";
  render(<SearchForm initValue="Avengers" onSearch={handleSearch} />);
  await fireEvent.change(screen.getByTestId("searchInput"), {
    target: { value: expectedValue },
  });
  await fireEvent.keyDown(screen.getByTestId("searchInput"), { key: "Enter" });
  expect(handleSearch).toHaveBeenCalledWith(expectedValue);
});
