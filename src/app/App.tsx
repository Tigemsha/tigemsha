import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { Topbar } from "./components/Topbar/Topbar";
import Footer from "./layouts/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Topbar />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
