import { BrowserRouter } from "react-router-dom";
import AppProviders from "./app/AppProviders";
import AppRoutes from "./app/AppRoutes";
import "./styles/pollen.css";

function App() {
  return (
    <AppProviders>
      <BrowserRouter basename='quik'>
        <AppRoutes />
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
