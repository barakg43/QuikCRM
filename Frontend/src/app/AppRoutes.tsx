import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Toaster
        position='top-center'
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={
          {
            //   success: {
            //     duration: 3000,
            //   },
            //   error: {
            //     duration: 5000,
            //   },
            //   style: {
            //     fontSize: "16px",
            //     maxWidth: "500px",
            //     padding: "16px 24px",
            //     backgroundColor: "var(--color-grey-0)",
            //     color: "var(--color-grey-700) ",
            //   },
          }
        }
      />
      <Routes>
        <Route></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
