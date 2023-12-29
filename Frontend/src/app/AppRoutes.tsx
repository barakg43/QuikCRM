import { Navigate, Route, Routes } from "react-router-dom";
import Account from "../pages/Account.tsx";
import Activities from "../pages/Activities";
import Customers from "../pages/Customers.tsx";
import PageNotFound from "../pages/PageNotFound";
import Reminders from "../pages/Reminders";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import SignUp from "../pages/Signup";
import Login from "./../pages/Login.tsx";
import AppLayout from "../components/AppLayout.tsx";
import Customer from "../pages/Customer.tsx";
``;
function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate replace to='/customers' />} />
        <Route path='/reminders' element={<Reminders />} />
        <Route path='/activities' element={<Activities />} />
        <Route path='/customers' element={<Customers />} />
        <Route path='/customers/:customerId' element={<Customer />} />
        <Route path='/reports' element={<Reports />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/account' element={<Account />} />
      </Route>
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRoutes;
