import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import ServiceRenewsHistoryTable from "./service-renews/ServiceRenewsHistoryTable";
function ChildTabs() {
  return (
    <Tabs isLazy>
      <TabList>
        <Tab>One</Tab>
        <Tab>Service Renews History</Tab>
        <Tab>Three</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <p>Activities</p>
        </TabPanel>
        <TabPanel>
          <ServiceRenewsHistoryTable />
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default ChildTabs;
