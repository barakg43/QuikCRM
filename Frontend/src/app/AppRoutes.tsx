import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='remainders'></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
