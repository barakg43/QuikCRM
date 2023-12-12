import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { HiArchive } from "react-icons/hi";
import { useTranslation } from "react-i18next";

const StyledMainNav = styled.menu`
  font-size: var(--size-4);
  justify-content: center;
  /* padding: 1rem 2rem; */
  display: flex;
  flex-direction: column;
  gap: var(--scale-000);
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  background-color: var(--color-primary-500);
  border-radius: var(--radius-sm);
  font-weight: var(--weight-medium);
  align-items: center;
  overflow-x: hidden;
  gap: var(--size-1);

  /* transition-delay: 300ms; */
  padding: var(--scale-000) var(--scale-00);
  & svg {
    //for the icon
    min-width: var(--scale-1);
    min-height: var(--scale-1);
  }
  & span {
    font-size: var(--scale-1);
    opacity: 0;
    color: var(--color-emerald-800);
    transition: opacity 300ms ease-in-out;
    overflow-x: hidden;
    font-weight: var(--weight-medium);
  }
  @keyframes showHide {
    /* Chrome, Safari */
    0% {
      width: 100%;
    }
    40% {
      width: 0%;
    }
    60% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
  &:hover {
    background-color: var(--color-primary-500);
  }
`;
type NavLinkItemProps = {
  path: string;
  label: string;
};

function NavLinkItem({ path, label }: NavLinkItemProps) {
  return (
    <li>
      <StyledNavLink to={path}>
        <HiArchive />
        <span>{label}</span>
      </StyledNavLink>
    </li>
  );
}
function MainNav() {
  const { t } = useTranslation("appLayout", { keyPrefix: "sidebar" });
  return (
    <StyledMainNav>
      <NavLinkItem path='/clients' label={t("clients")} />
      <NavLinkItem path='/settings' label={t("settings")} />
      <NavLinkItem path='/account' label={t("account")} />
      <NavLinkItem path='/reminders' label={t("reminders")} />
      <NavLinkItem path='/activities' label={t("activities")} />
      <NavLinkItem path='/reports' label={t("reports")} />
    </StyledMainNav>
  );
}

export default MainNav;
