import { Navigate, Route, Routes } from "react-router-dom";
import Account from "../pages/Account.tsx";
import Activities from "../pages/Activities";
import Clients from "../pages/Clients";
import PageNotFound from "../pages/PageNotFound";
import Reminders from "../pages/Reminders";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import SignUp from "../pages/Signup";
import Login from "./../pages/Login.tsx";
``;
function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate replace to='/clients' />} />
      <Route path='/reminders' element={<Reminders />} />
      <Route path='/activities' element={<Activities />} />
      <Route path='/clients' element={<Clients />} />
      <Route path='/reports' element={<Reports />} />
      <Route path='/settings' element={<Settings />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/account' element={<Account />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRoutes;
