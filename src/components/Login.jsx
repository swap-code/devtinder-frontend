import axios from "axios";
import React from "react";

const Login = () => {
    const [emailId, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        emailId,
        password,
      },{withCredentials: true});
    } catch (err) {
      console.error("Login failed:", err);
    }
  };


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card bg-primary text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title">Login </h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Enter your Email</legend>
            <input
              type="text"
              value={emailId}
              onChange={(e) => setEmail(e.target.value)}
              className=" text-black bg-white input"
              placeholder="Type here"
            />
            <legend className="fieldset-legend">Enter your Password</legend>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" text-black bg-white input"
              placeholder="Type here"
            />
          </fieldset>
          <div className="card-actions justify-end">
            <button onClick={handleLogin} className="btn">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
