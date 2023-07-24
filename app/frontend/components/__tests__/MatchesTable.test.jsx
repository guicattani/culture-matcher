import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom/client";
import fetch from "cross-fetch";
import crossFetch from "cross-fetch";
import MatchesTable from "../MatchesTable";
global.fetch = fetch;
global.IS_REACT_ACT_ENVIRONMENT = true;

const matchesResponse = [
  {
    id: 1,
    applicant_id: 1,
    company_id: 1,
    created_at: "2023-07-24T16:35:38.803Z",
    updated_at: "2023-07-24T16:35:38.803Z",
    company: {
      name: "Please Incorporated",
    },
    applicant: {
      first_name: "Barney",
      last_name: "Stinson",
    },
  },
  {
    id: 2,
    applicant_id: 5,
    company_id: 3,
    created_at: "2023-07-24T16:35:38.948Z",
    updated_at: "2023-07-24T16:35:38.948Z",
    company: {
      name: "Clever 2 Incorporated",
    },
    applicant: {
      first_name: "Marshall",
      last_name: "Eriksen",
    },
  },
  {
    id: 3,
    applicant_id: 4,
    company_id: 3,
    created_at: "2023-07-24T16:35:39.073Z",
    updated_at: "2023-07-24T16:35:39.073Z",
    company: {
      name: "Clever 2 Incorporated",
    },
    applicant: {
      first_name: "Lilly",
      last_name: "Aldrin",
    },
  },
  {
    id: 4,
    applicant_id: 5,
    company_id: 4,
    created_at: "2023-07-24T16:35:39.198Z",
    updated_at: "2023-07-24T16:35:39.198Z",
    company: {
      name: "Carbon Neutral Incorporated",
    },
    applicant: {
      first_name: "Marshall",
      last_name: "Eriksen",
    },
  },
  {
    id: 5,
    applicant_id: 4,
    company_id: 4,
    created_at: "2023-07-24T16:35:39.322Z",
    updated_at: "2023-07-24T16:35:39.322Z",
    company: {
      name: "Carbon Neutral Incorporated",
    },
    applicant: {
      first_name: "Lilly",
      last_name: "Aldrin",
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

describe("MatchesTable", () => {
  it("should have matches as preloaded in fetch", async () => {
    crossFetch.mockResolvedValue({
      status: 200,
      json: () => matchesResponse,
    });
    act(() => {
      ReactDOM.createRoot(container).render(<MatchesTable />);
    });
    await waitFor(() => {
      expect(screen.getByText("Applicant ID")).toBeInTheDocument();
      expect(screen.getAllByText("Lilly")).toHaveLength(2);
      expect(screen.getAllByText("Eriksen")).toHaveLength(2);
      expect(screen.getByText("Please Incorporated")).toBeInTheDocument();
      expect(screen.getAllByText("Carbon Neutral Incorporated")).toHaveLength(
        2
      );
    });
  });
});
