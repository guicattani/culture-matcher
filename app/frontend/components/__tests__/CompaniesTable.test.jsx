import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom/client";
import fetch from "cross-fetch";
import crossFetch from "cross-fetch";
import CompaniesTable from "../CompaniesTable";
global.fetch = fetch;
global.IS_REACT_ACT_ENVIRONMENT = true;

const companiesResponse = [
  {
    id: 1,
    name: "Please Incorporated",
    culture_type_id: 2,
    created_at: "2023-07-24T14:28:07.242Z",
    updated_at: "2023-07-24T14:28:07.242Z",
    culture_type: {
      name: "Please",
    },
  },
  {
    id: 2,
    name: "Clever Incorporated",
    culture_type_id: 3,
    created_at: "2023-07-24T16:26:28.361Z",
    updated_at: "2023-07-24T16:26:28.361Z",
    culture_type: {
      name: "Clever",
    },
  },
  {
    id: 3,
    name: "Clever 2 Incorporated",
    culture_type_id: 4,
    created_at: "2023-07-24T14:28:07.242Z",
    updated_at: "2023-07-24T14:28:07.242Z",
    culture_type: {
      name: "Clever",
    },
  },
  {
    id: 4,
    name: "Carbon Neutral Incorporated",
    culture_type_id: 4,
    created_at: "2023-07-24T14:28:07.242Z",
    updated_at: "2023-07-24T14:28:07.242Z",
    culture_type: {
      name: "Carbon Neutral",
    },
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

describe("CompaniesTable", () => {
  it("should have companies as preloaded in fetch", async () => {
    crossFetch.mockResolvedValue({
      status: 200,
      json: () => companiesResponse,
    });
    act(() => {
      ReactDOM.createRoot(container).render(<CompaniesTable />);
    });
    await waitFor(() => {
      expect(screen.getByText("Clever Incorporated")).toBeInTheDocument();
      expect(
        screen.getByText("Carbon Neutral Incorporated")
      ).toBeInTheDocument();
    });
  });
});
