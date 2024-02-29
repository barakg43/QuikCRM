import { Box, Link, VStack, chakra } from "@chakra-ui/react";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";

import { NavLink as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import {
  TbAlarm,
  TbClipboardList,
  TbReportAnalytics,
  TbSettings,
  TbUsers,
} from "react-icons/tb";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledMainNav = styled.menu`
  justify-content: center;
  padding: 0 var(--scale-3) var(--scale-3) var(--scale-3) !important;
  display: flex;
  flex-direction: column;
  gap: var(--scale-3);
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  background-color: var(--color-primary-500);
  border-radius: var(--radius-sm);
  font-weight: var(--weight-medium);
  align-items: center;
  text-align: center;

  gap: var(--scale-2);
  padding: 0 var(--scale-0000);
  /* transition-delay: 300ms; */
  /* padding: var(--scale-000) var(--scale-00); */
  & svg {
    //for the icon
    min-width: var(--scale-4);
    min-height: var(--scale-1);
  }
  & span {
    display: block;
    font-size: var(--scale-5);
    transition: opacity 300ms ease-in-out;
    font-weight: var(--weight-medium);
    margin: 2px;
  }
  &:hover {
    background-color: var(--color-primary-500);
  }
`;
type NavLinkItemProps = {
  path: string;
  label: string;
  icon?: ReactElement | null | undefined;
};

function NavLinkItem({ path, label, icon }: NavLinkItemProps) {
  return (
    <li>
      <ChakraLink
        as={ReactRouterLink}
        to={path}
        display='flex'
        gap='0.5rem'
        _hover={{ backgroundColor: " var(--color-primary-700)" }}
        borderRadius='var(--radius-sm)'
        padding='0 var(--scale-0000)'
        fontSize='var(--scale-5)'
        _activeLink={{
          fontWeight: "bold",
          backgroundColor: " var(--color-primary-500)",
        }}
      >
        {icon}
        <Box as='span' margin='2px'>
          {label}
        </Box>
      </ChakraLink>
    </li>
  );
}
function MainNav() {
  const { t } = useTranslation("appLayout", { keyPrefix: "sidebar" });
  return (
    <VStack listStyleType='none' gap='0.5rem' justifyContent='center'>
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
    </VStack>
  );
}

export default MainNav;
