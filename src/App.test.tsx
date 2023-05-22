import React from "react";
import { render, screen } from "@testing-library/react";
import Continents from "./container/Continents";

test("renders learn react link", () => {
  render(<Continents />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
