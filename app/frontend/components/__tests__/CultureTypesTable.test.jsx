import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom/client";
import fetch from "cross-fetch";
import crossFetch from "cross-fetch";
import CultureTypesTable from "../CultureTypesTable";
global.fetch = fetch;
global.IS_REACT_ACT_ENVIRONMENT = true;

const cultureTypesResponse = [
  {
    id: 2,
    name: "Please",
    created_at: "2023-07-24T14:28:07.244Z",
    updated_at: "2023-07-24T14:28:07.244Z",
  },
  {
    id: 3,
    name: "Clever",
    created_at: "2023-07-24T14:28:07.244Z",
    updated_at: "2023-07-24T14:28:07.244Z",
  },
  {
    id: 4,
    name: "Carbon Neutral",
    created_at: "2023-07-24T14:28:07.244Z",
    updated_at: "2023-07-24T14:28:07.244Z",
  },
];

jest.mock("cross-fetch", () => {
  //Mock the default export
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

let container;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("CultureTypesTable", () => {
  it("should have culture types as preloaded in fetch", async () => {
    crossFetch.mockResolvedValue({
      status: 200,
      json: () => cultureTypesResponse,
    });
    act(() => {
      ReactDOM.createRoot(container).render(<CultureTypesTable />);
    });
    await waitFor(() => {
      expect(screen.getByText("Please")).toBeInTheDocument();
      expect(screen.getByText("Carbon Neutral")).toBeInTheDocument();
    });
  });
});
