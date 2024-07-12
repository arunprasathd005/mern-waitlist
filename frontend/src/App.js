import { Route, Routes } from "react-router-dom";
import JoinRoom from "./pages/JoinRoom";
import LeaderBoard from "./pages/LeaderBoard";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CouponsPage from "./pages/CouponsPage";


import io from "socket.io-client";
import AdminPage from "./pages/AdminPage";
const baseURL = 'http://localhost:8000';
const socket = io.connect(baseURL);

function App() {
  return (
    <div className="flex    justify-center items-center h-[100vh] overflow-hidden  w-[100vw] box-border">
      <Routes>
        <Route path={"/"} element={<LoginPage />} />
        <Route path={"/home"} element={<HomePage />} />
        <Route
          path={"/leader-board"}
          element={<LeaderBoard socket={socket} />}
        />
        <Route
          path={"/early-register"}
          element={<JoinRoom socket={socket} />}
        />
        <Route path={"/reedem-coupons"} element={<CouponsPage />} />
        <Route path={"/admindashboard"} element={<AdminPage />} />
        
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
