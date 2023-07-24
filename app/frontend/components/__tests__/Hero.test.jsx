import React from "react";
import { render, screen } from "@testing-library/react";

import Hero from "../Hero";

describe("Hero", () => {
  it("should show text Culture Matcher", () => {
    render(<Hero />);
    expect(screen.getByRole("heading")).toHaveTextContent(/Culture Matcher/);
  });
});
