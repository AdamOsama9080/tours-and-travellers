import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Test from "./Pages/Test/Test";
import { useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle";
import Overview from "./Components/Overview/Overview";
import Search from "./Pages/Search/Search";
import Tabs from "./Components/Tabs/Tabs";
import TourCard from "./Components/TourCard/TourCard";
import { AuthProvider } from "./Contexts/authContext ";
// import { AuthProvider } from "../../Contexts/authContext ";


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Test />
      </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
