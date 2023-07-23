import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import ApplicantsTable from "./ApplicantsTable";
import CompaniesTable from "./CompaniesTable";
import CultureTypesTable from "./CultureTypesTable";
import MatchesTable from "./MatchesTable";

export default function CultureMatcherTabs() {
  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Applicants</Tab>
          <Tab>Companies</Tab>
          <Tab>Culture Types</Tab>
          <Tab>Matches</Tab>
        </TabList>

        <TabPanel>
          <ApplicantsTable />
        </TabPanel>

        <TabPanel>
          <CompaniesTable />
        </TabPanel>

        <TabPanel>
          <CultureTypesTable />
        </TabPanel>

        <TabPanel>
          <MatchesTable />
        </TabPanel>
      </Tabs>
    </div>
  );
}
