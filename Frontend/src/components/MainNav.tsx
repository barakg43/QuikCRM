import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { HiArchive } from "react-icons/hi";
import { useTranslation } from "react-i18next";

const StyledMainNav = styled.ul`
  font-size: var(--size-5);
  justify-content: center;
  /* padding: 1rem 2rem; */
  display: flex;
  flex-direction: column;
  gap: var(--scale-000);
`;
const StyledNavLink = styled(NavLink)`
  display: block;
  background-color: var(--color-primary-500);

  border-radius: var(--radius-sm);
  font-weight: var(--weight-medium);
  /* display: flex; */
  /* justify-content: center; */
  transition: all 0.3s;
  padding: var(--scale-000) var(--scale-00);
  & svg {
    //for the icon
    width: var(--scale-1);
    height: var(--scale-1);
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
