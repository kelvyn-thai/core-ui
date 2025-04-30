import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Combobox from "../combobox";

describe("Combobox", () => {
  it("renders with default label", () => {
    render(<Combobox />);
    expect(screen.getByText("Autocomplete")).toBeInTheDocument();
  });

  it("renders with custom label", () => {
    render(<Combobox label="Search Fruit" />);
    expect(screen.getByText("Search Fruit")).toBeInTheDocument();
  });

  it("renders input with placeholder", () => {
    render(<Combobox placeholder="Search..." />);
    expect(
      screen.getByPlaceholderText("Type something...."),
    ).toBeInTheDocument();
  });

  it("updates input value when typing", () => {
    render(<Combobox />);
    const input = screen.getByPlaceholderText(
      "Type something....",
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "apple" } });
    expect(input.value).toBe("apple");
  });
});
