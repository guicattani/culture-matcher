import { useState, useMemo, useEffect } from "react";

import { MaterialReactTable } from "material-react-table";

import { Favorite } from "@mui/icons-material/";
import { IconButton, Tooltip } from "@mui/material";

/**
 * MatchesTable is the component the Table and the Start Match action
 * for the Match model
 *
 * It starts by fetching matches from `/api/v1/matches`
 */
export default function MatchesTable() {
  const [tableLoading, setTableLoading] = useState(true);
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    fetch("/api/v1/matches")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMatches(data);
        setTableLoading(false);
      });
  }, []);

  const createMatches = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/v1/matches/match", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setMatches([...matches, ...data]);
      });
  };

  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: "applicant_id",
        header: "Applicant ID",
        size: 100,
      },
      {
        accessorKey: "applicant.first_name",
        header: "Applicant First Name",
        size: 150,
      },
      {
        accessorKey: "applicant.last_name",
        header: "Applicant Last Name",
        size: 150,
      },
      {
        accessorKey: "company_id",
        header: "Company ID",
        size: 100,
      },
      {
        accessorKey: "company.name",
        header: "Company Name",
        size: 120,
      },
    ],
    []
  );

  return (
    <div>
      <MaterialReactTable
        layoutMode="grid"
        columns={columns}
        data={matches}
        state={{ isLoading: tableLoading }}
        muiTableContainerProps={{
          sx: {
            minWidth: "1000px",
          },
        }}
        renderTopToolbarCustomActions={() => {
          return (
            <div>
              <Tooltip arrow title="Start Match">
                <IconButton onClick={createMatches}>
                  <Favorite />
                </IconButton>
              </Tooltip>
            </div>
          );
        }}
      />
    </div>
  );
}
