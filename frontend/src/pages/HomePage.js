import React, { useEffect } from "react";
import iphone from "../utils/iphone.png";
import earphone from "../utils/earphone.png";
import axios from "axios";
import { UserState } from "../context/UserProvider";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const { token, setUser, user } = UserState();

  const navigate = useNavigate();

  const getInfo = async (token) => {
    let config = {
      headers: {
        Authorization: "Bearer " + token,
        withCredentials: true,
      },
    };
    // console.log(process.env.REACT_APP_BASE_URL);
    const baseURL = 'http://localhost:8000';

    axios
      .get(`${baseURL}/user/get-info`, config)
      .then((response) => {
        const { user } = response.data;
        setUser(user);
      })
      .catch((err) => {
        console.log("invalid jwt user not authenticated");
        navigate("/");
      });
  };

  const EXPIRE_TIME = 1000 * 60 * 60;
  setTimeout(function () {
    localStorage.removeItem('signedJWT');
  }, EXPIRE_TIME);

  useEffect(() => {
    if (token) {
      getInfo(token);
    } else {
      navigate("/");
    }
  }, [token, navigate]);

  const logout = () => {
    localStorage.removeItem('signedJWT');
    setUser(null);
    navigate("/");
  };

  return (
    <div className="h-[100vh] w-[100vw] bg-white overflow-x-hidden relative flex flex-col">
      <div className="bg-white rounded-2xl relative w-[100%] h-[70%] top-[-5%] sm:h-[75%] sm:w-[100%] sm:left-[0%] sm:top-[0%] md:top-[2%] md:left-[40%] md:h-[70%] md:w-[60%]">
        <img
          src={earphone}
          className="object-contain w-[100%] h-[100%] sm:w-[90%] sm:h-[90%] absolute left-[30%] top-[0%]"
        />
        <img
          src={iphone}
          className="object-contain w-[100%] h-[100%] sm:w-[90%] sm:h-[90%] absolute top-[6%] left-[-10%] sm:left-[-10%] md:left-[2%]"
        />
        <div className="relative w-[90%] top-[100%] sm:top-[90%] left-[3%] md:w-[90%] md:left-[-60%] md:top-[30%] flex flex-col items-start gap-4 sm:gap-5">
          <h1 className="bg-clip-text flex text-transparent bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-600 font-sans text-3xl sm:text-5xl md:text-7xl">
            The fastest, most powerful iPhone yet{" "}
          </h1>
        </div>
      </div>
      <div className="mt-[-10%] w-[100%] flex-1 flex justify-center items-center">
        {user && (
          <div className="mt-[10%] md:mt-[7%] sm:mx-[10%]">
            {/* not registered for the iPhone */}
            {!user.joinedRoom && (
              <p className="text-2xl cursor-pointer sm:text-2xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-600">
                <Link to={"/early-register"}> Register</Link>
                <i className="fa-solid fa-chevron-right"></i>
              </p>
            )}
            {/* user registered for iPhone */}
            {user.joinedRoom && (
              <p className="text-2xl cursor-pointer sm:text-2xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-600">
                <Link to={"/leader-board"}> Leaderboard</Link>
                <i className="fa-solid fa-chevron-right"></i>
              </p>
            )}
            {/* user registered for the iPhone and got position 1 in the leaderboard */}
            {user.winner && (
              <p className="text-2xl cursor-pointer sm:text-2xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-600">
                <Link to={"/redeem-coupons"}> Coupons</Link>
                <i className="fa-solid fa-chevron-right"></i>
              </p>
            )}
          </div>
        )}
      </div>
      <div className="flex justify-center mt-5">
      <p className="text-2xl cursor-pointer sm:text-2xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-600">
        <button onClick={logout}  >
        <i className="fa-solid fa-chevron-left"></i>
          Logout
        </button>
        </p>
      </div>
    </div>
  );
};

export default HomePage;
