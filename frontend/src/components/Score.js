import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserState } from "../context/UserProvider";
import axios from "axios";

const Score = ({ socket }) => {
  const { user, score, setScore, token } = UserState();

  const navigate = useNavigate();
  const baseURL = 'http://localhost:8000';

  useEffect(() => {
    socket.on("updated-leaderboard", (leaderboard) => {
      console.log(leaderboard);
      let position = leaderboard.users;
      setScore(position);
    });
    getScore();
  }, []);

  const getScore = async () => {
    let config = {
      headers: {
        Authorization: "Bearer " + token,
        withCredentials: true,
      },
    };

    try {
      const res = await axios.get(`${baseURL}/user/room/get`, config);
      setScore(res.data.scores.users);
    } catch (err) {
      console.log("Error fetching scores:", err.message);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Copied to clipboard:", text);
    } catch (err) {
      console.error("Failed to copy:", err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen w-full gap-5 bg-white p-5">
      <p className="text-2xl cursor-pointer sm:text-2xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-600" onClick={() => navigate(-1)}>
        <span><i className="fas fa-angle-left mr-3"></i></span>
        Leaderboard
      </p>

      <div className="flex flex-col md:flex-row items-center justify-between w-full mt-7 max-w-5xl">
        <div className="w-full md:w-2/3 h-96 overflow-y-auto bg-white rounded-lg shadow-md">
          <ul className="w-full h-full p-4 overflow-y-auto">
            {score.map((item) => (
              <li
                key={item._id}
                className={`flex items-center justify-between px-5 py-3 rounded-lg mb-2 ${
                  item.user && item.user.email === user.email
                    ? "bg-purple-300"
                    : "bg-purple-100"
                }`}
              >
                <span className="font-bold">
                  #{item.position <= 0 ? 1 : item.position}
                </span>
                <span className="font-bold">{item.user?.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full md:w-1/3 mt-5 md:mt-0">
          {score.map((item) => (
            item.user && item.user.email === user.email && (
              <div
                key={item._id}
                className="flex flex-col items-center justify-center bg-purple-600 p-4 rounded-lg shadow-md mb-4"
              >
                <p
                  className="text-lg font-bold text-orange-200 cursor-pointer"
                  onClick={() => copyToClipboard(item.user.referralCode)}
                >
                  Your Referral code{" "}
                  <span className="font-extrabold">{item.user.referralCode}</span>
                  <span><i className="far fa-clipboard mx-2"></i></span>
                </p>

                <div className="mt-4">
                  <ul>
                    <li>25% off on the iPhone 14 for #1</li>
                    <li>Earn 10 points on each referral</li>
                  </ul>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default Score;
