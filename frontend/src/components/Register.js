import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = ({ handleLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      return toast.error("Confirm password incorrect");
    }
    setLoading(true);
    const user = { name, email, password };

    // Replace 'http://localhost:8000' with your actual API base URL
    const baseURL = 'http://localhost:8000'; // Example: http://localhost:8000
    axios
      .post(`${baseURL}/auth/register`, {
        name,
        email,
        password
      })
      .then((response) => {
        if (response.status === 201) {
          console.log(response.data);
          toast.success("Registered successfully");
          handleLogin(); // Optionally redirect to login page after successful registration
        } else {
          console.log(response.data.message);
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        toast.error("Registration failed");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleInput = (e, changeState) => {
    changeState(e.target.value);
  };

  return (
    <div className="h-[70%] w-[80%] md:w-[70%] rounded-xl flex flex-col gap-2">
      <h3 className="text-3xl">Create an account</h3>
      <p className="text-gray-500 text-sm">
        Please enter your email and a password for your account.
      </p>
      <form className="flex flex-col gap-2 mt-5" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          placeholder="Name"
          className="login-input"
          type="text"
          value={name}
          onChange={(e) => handleInput(e, setName)}
        />
        <label>Email</label>
        <input
          placeholder="Email"
          className="login-input"
          type="email"
          value={email}
          onChange={(e) => handleInput(e, setEmail)}
        />
        <label>Password</label>
        <input
          placeholder="Password"
          className="login-input"
          type="password"
          value={password}
          onChange={(e) => handleInput(e, setPassword)}
        />
        <label>Confirm password</label>
        <input
          placeholder="Confirm password"
          className="login-input"
          type="password"
          value={confirmPassword}
          onChange={(e) => handleInput(e, setConfirmPassword)}
        />

        <button className="login-btn mt-5" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-gray-500 text-sm m-auto mt-5">
          Have an account?{" "}
          <span>
            <button
              onClick={handleLogin}
              type="button"
              className="text-md underline text-blue-500"
            >
              Login
            </button>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
