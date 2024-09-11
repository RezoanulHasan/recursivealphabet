import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Component/Shared/Navbar/Navbar";

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="top">
      <Navbar></Navbar>
      <div className="pt-24 min-h-[calc(100vh-68px)]">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
