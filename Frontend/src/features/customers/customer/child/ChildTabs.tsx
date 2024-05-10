import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import ServiceRenewsHistoryTable from "./service-renews/ServiceRenewsHistoryTable";
function ChildTabs() {
  const { t } = useTranslation("customers", { keyPrefix: "child" });

  return (
    <Tabs isLazy height={"100vh"}>
      <TabList>
        <Tab>{t("activities")}</Tab>
        <Tab>{t("service-contracts")}</Tab>
        <Tab>{t("product-renews")}</Tab>
      </TabList>

      <TabPanels overflow='scroll'>
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
