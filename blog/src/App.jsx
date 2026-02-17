import { Outlet } from "react-router-dom";
import "./App.css";
import { Footer, Header } from "./componants/index.js";

function App() {
  return (
    <>
      <div className="flex-col flex flex-wrap justify-center items-center bg-gray-600 h-screen text-amber-50">
        <div className="bg-gray-950 p-0.5 m-1.5 ">
          <Header />
        </div>
        <div className="bg-gray-950 p-0.5 m-1.5 ">
          TODO: <Outlet />
        </div>
        <div className="bg-gray-950 p-0.5 m-1.5 ">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
