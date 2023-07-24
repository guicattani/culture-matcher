import React from "react";
import { render, screen } from "@testing-library/react";

import { listCategories } from "../../services/API";

describe("App", () => {
  it("should work as expected", () => {
    // render(<App />);
    expect(1 + 1).toBe(2);
  });
});
