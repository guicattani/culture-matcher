import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom/client";
import fetch from "cross-fetch";
import crossFetch from "cross-fetch";
import ApplicantsTable from "../ApplicantsTable";
global.fetch = fetch;
global.IS_REACT_ACT_ENVIRONMENT = true;

const applicantsResponse = [
  {
    id: 1,
    first_name: "Barney",
    last_name: "Stinson",
    culture_type_id: 2,
    created_at: "2023-07-24T14:28:07.237Z",
    updated_at: "2023-07-24T14:28:07.237Z",
    culture_type: {
      name: "Please",
    },
  },
  {
    id: 2,
    first_name: "Ted",
    last_name: "Mosby",
    culture_type_id: 3,
    created_at: "2023-07-24T14:28:07.237Z",
    updated_at: "2023-07-24T14:28:07.237Z",
    culture_type: {
      name: "Clever",
    },
  },
  {
    id: 3,
    first_name: "Robin",
    last_name: "Scherbatsky",
    culture_type_id: 4,
    created_at: "2023-07-24T14:28:07.237Z",
    updated_at: "2023-07-24T14:28:07.237Z",
    culture_type: {
      name: "Clever",
    },
  },
  {
    id: 4,
    first_name: "Lilly",
    last_name: "Aldrin",
    culture_type_id: 5,
    created_at: "2023-07-24T14:28:07.237Z",
    updated_at: "2023-07-24T14:28:07.237Z",
    culture_type: {
      name: "Carbon Neutral",
    },
  },
  {
    id: 5,
    first_name: "Marshall",
    last_name: "Eriksen",
    culture_type_id: 5,
    created_at: "2023-07-24T14:28:07.237Z",
    updated_at: "2023-07-24T14:28:07.237Z",
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

describe("ApplicantsTable", () => {
  it("should have applicants as preloaded in fetch", async () => {
    crossFetch.mockResolvedValue({
      status: 200,
      json: () => applicantsResponse,
    });
    act(() => {
      ReactDOM.createRoot(container).render(<ApplicantsTable />);
    });
    await waitFor(() => {
      expect(screen.getByText("Ted")).toBeInTheDocument();
      expect(screen.getByText("Mosby")).toBeInTheDocument();
      expect(screen.getByText("Please")).toBeInTheDocument();
      expect(screen.getAllByText("Carbon Neutral")).toHaveLength(2);
    });
  });
});
