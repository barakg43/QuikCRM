import { Box, Link as ChakraLink, List, ListItem } from "@chakra-ui/react";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import {
  TbAlarm,
  TbClipboardList,
  TbReportAnalytics,
  TbSettings,
  TbUsers,
} from "react-icons/tb";
import { NavLink as ReactRouterLink } from "react-router-dom";

// const StyledMainNav = styled.menu`
//   justify-content: center;
//   padding: 0 var(--scale-3) var(--scale-3) var(--scale-3) !important;
//   display: flex;
//   flex-direction: column;
//   gap: var(--scale-3);
// `;

type NavLinkItemProps = {
  path: string;
  label: string;
  icon?: ReactElement | null | undefined;
};

function NavLinkItem({ path, label, icon }: NavLinkItemProps) {
  return (
    <ListItem w='100%'>
      <ChakraLink
        as={ReactRouterLink}
        to={path}
        display='flex'
        gap='0.5rem'
        _hover={{
          backgroundColor: " var(--color-primary-500)",
          color: "white",
        }}
        borderRadius='var(--radius-sm)'
        // padding='0 var(--scale-00000)'
        paddingInline={"var(--scale-0)"}
        flexGrow={1}
        fontSize='var(--scale-5)'
        _activeLink={{
          fontWeight: "bold",
          color: "teal.900",
          backgroundColor: " var(--color-primary-300)",
        }}
      >
        {icon}
        <Box as='span' margin='2px'>
          {label}
        </Box>
      </ChakraLink>
    </ListItem>
  );
}
function MainNav() {
  const { t } = useTranslation("appLayout", { keyPrefix: "sidebar" });
  return (
    <List
      listStyleType='none'
      display='flex'
      flexDir={"column"}
      gap='1rem'
      // justifyContent='center'
      alignItems={"start"}
      w='100%'
      padding='0 2rem'
    >
      <NavLinkItem
        icon={<TbUsers />}
        path='/customers'
        label={t("customers")}
      />
      <NavLinkItem
        icon={<TbAlarm />}
        path='/reminders'
        label={t("reminders")}
      />
      <NavLinkItem
        icon={<TbClipboardList />}
        path='/activities'
        label={t("activities")}
      />
      <NavLinkItem
        icon={<TbReportAnalytics />}
        path='/reports'
        label={t("reports")}
      />
      <NavLinkItem
        icon={<TbSettings />}
        path='/settings'
        label={t("settings")}
      />
    </List>
  );
}

export default MainNav;
