import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { deleteMovieData } from "../../helpers/Helpers";
import { useParams, useNavigate } from "react-router-dom";
import DeleteMovieForm from "./DeleteMovieForm";
import "@testing-library/jest-dom";

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  createPortal: (node) => node,
}));

jest.mock("focus-trap-react", () => {
  return ({ children }) => <div>{children}</div>;
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock("../../helpers/Helpers");
let navigate;

beforeEach(() => {
  navigate = jest.fn();
  useNavigate.mockReturnValue(navigate);
  useParams.mockReturnValue({ movieId: 123 });
});

it("renders", async () => {
  render(<DeleteMovieForm />);
  await waitFor(() => screen.findByText("DELETE MOVIE"));
  expect(screen.getByText("DELETE MOVIE")).toBeInTheDocument();
});

it("navigates back to home page on close", () => {
  render(<DeleteMovieForm />);
  const closeButton = screen.getByTestId("closeBtn");
  fireEvent.click(closeButton);
  expect(navigate).toHaveBeenCalledWith("/");
});

it("deletes movie and navigates back to home page on delete", async () => {
  deleteMovieData.mockResolvedValue({});
  render(<DeleteMovieForm />);
  const deleteButton = screen.getByTestId("confirmBtn");
  fireEvent.click(deleteButton);
  await waitFor(() => {
    expect(navigate).toHaveBeenCalledWith("/");
  });
});
