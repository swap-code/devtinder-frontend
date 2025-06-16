import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");

  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    emailId: "",
    password: "",
    about: "",
    skills: "",
    photoUrl: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const endpoint = isSignup
        ? "http://localhost:3000/signup"
        : "http://localhost:3000/login";

      const payload = isSignup
        ? form
        : { emailId: form.emailId, password: form.password };

      const response = await axios.post(endpoint, payload, {
        withCredentials: true,
      });

      if (isSignup) {
        setSuccessMessage("Signup successful! Please login.");
        setIsSignup(false); // switch to login
        setForm({
          firstName: "",
          lastName: "",
          age: "",
          gender: "",
          emailId: "",
          password: "",
          about: "",
          skills: "",
          photoUrl: "",
        }); // reset form
      } else {
        dispatch(addUser(response.data.user));
        navigate("/feed");
      }
    } catch (err) {
      console.error(`${isSignup ? "Signup" : "Login"} failed:`, err);
      alert(`${isSignup ? "Signup" : "Login"} failed. Please try again.`);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card bg-primary text-primary-content w-[500px]">
        <div className="card-body">
          <h2 className="card-title">{isSignup ? "Signup" : "Login"}</h2>

          {successMessage && (
            <div className="text-green-300 text-sm mb-2 text-center">
              {successMessage}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {isSignup && (
              <>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="input text-black bg-white"
                />
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="input text-black bg-white"
                />
                <input
                  name="age"
                  type="number"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="Age"
                  className="input text-black bg-white"
                />
                <input
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  placeholder="Gender"
                  className="input text-black bg-white"
                />
              </>
            )}

            <input
              name="emailId"
              type="email"
              value={form.emailId}
              onChange={handleChange}
              placeholder="Email"
              className="input text-black bg-white col-span-2"
            />
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="input text-black bg-white col-span-2"
            />

            {isSignup && (
              <>
                <textarea
                  name="about"
                  value={form.about}
                  onChange={handleChange}
                  placeholder="About You"
                  className="textarea text-black bg-white col-span-2"
                />
                <input
                  name="skills"
                  value={form.skills}
                  onChange={handleChange}
                  placeholder="Skills (comma-separated)"
                  className="input text-black bg-white col-span-2"
                />
                <input
                  name="photoUrl"
                  value={form.photoUrl}
                  onChange={handleChange}
                  placeholder="Photo URL"
                  className="input text-black bg-white col-span-2"
                />
              </>
            )}
          </div>

          <div className="card-actions justify-between mt-4">
            <button
              onClick={() => {
                setIsSignup(!isSignup);
                setSuccessMessage("");
              }}
              className="btn btn-outline"
            >
              {isSignup ? "Switch to Login" : "Switch to Signup"}
            </button>
            <button onClick={handleSubmit} className="btn">
              {isSignup ? "Signup" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
