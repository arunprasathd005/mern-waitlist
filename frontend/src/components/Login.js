import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserState } from "../context/UserProvider";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken } = UserState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    setLoading(true);
    const baseURL = 'http://localhost:8000';

    try {
      const response = await axios.post(`${baseURL}/auth/login`, {
        user: { email, password },
        withCredentials: true,
      });

      if (response.status === 200) {
        const token = response.data.token;
        setToken(token);
        localStorage.setItem("signedJWT", JSON.stringify(token));
        toast.success("Logged in successfully");

        // Check if the logged-in user is the default admin
        if (email === "admin@gmail.com") {
          localStorage.setItem("isAdmin", "true");
          navigate("/admindashboard");
        } else {
          localStorage.setItem("isAdmin", "false");
          navigate("/home");
        }
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e, changeState) => {
    changeState(e.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem("signedJWT");
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    if (token) {
      setToken(JSON.parse(token));
      if (isAdmin) {
        navigate("/admindashboard");
      } else {
        navigate("/home");
      }
    }
  }, [setToken, navigate]);

  return (
    <div className="h-[70%] w-[80%] md:w-[70%] rounded-xl flex flex-col gap-2">
      <h3 className="text-3xl">Hey, hello!</h3>
      <p className="text-gray-500 text-sm">
        Enter the information you entered while registering.
      </p>
      <form className="flex flex-col gap-2 mt-5" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="text"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => handleInput(e, setEmail)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => handleInput(e, setPassword)}
        />
        <button className="login-btn mt-5" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-[45%] h-[0.4px] bg-slate-500/50 "></div>
          <p>OR</p>
          <div className="w-[45%] h-[0.4px] bg-slate-500/50 "></div>
        </div>
        <p className="text-gray-500 text-sm m-auto mt-5">
          Not registered?{" "}
          <span>
            {" "}
            <button
              onClick={handleLogin}
              className="text-md underline text-blue-500"
            >
              Create an account
            </button>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
