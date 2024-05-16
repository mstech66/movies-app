import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { useOutletContext } from "react-router-dom";
import SearchForm from "./SearchForm";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useOutletContext: jest.fn(),
}));

describe("<SearchForm />", () => {
  let searchQuery;
  let handleSearch;

  beforeEach(() => {
    searchQuery = "";
    handleSearch = jest.fn();

    useOutletContext.mockImplementation(() => [searchQuery, handleSearch]);
  });

  test("renders correctly", () => {
    render(<SearchForm />);
    expect(screen.getByTestId("searchInput").value).toBe(searchQuery);
  });

  test("calls handleSearch when enter key is pressed", () => {
    render(<SearchForm />);
    const searchInput = screen.getByTestId("searchInput");

    fireEvent.keyDown(searchInput, {
      key: "Enter",
      target: { value: "New Search Query" },
    });
    expect(handleSearch).toHaveBeenCalledWith("New Search Query");
  });

  test("calls handleSearch when search button is clicked", () => {
    render(<SearchForm />);
    const searchBtn = screen.getByTestId("searchBtn");
    const searchInput = screen.getByTestId("searchInput");

    fireEvent.change(searchInput, { target: { value: "New Search Query" } });
    fireEvent.click(searchBtn);

    expect(handleSearch).toHaveBeenCalledWith("New Search Query");
  });
});
