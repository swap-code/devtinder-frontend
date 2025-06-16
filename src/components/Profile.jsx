import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [editMode, setEditMode] = React.useState(false);

  const [form, setForm] = React.useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    emailId: user?.emailId || "",
    age: user?.age || "",
    gender: user?.gender || "",
    about: user?.about || "",
    skills: user?.skills || "",
    photoUrl: user?.photoUrl || "", // <-- Added
  });

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        "http://localhost:3000/profile/edit",
        { form },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(response.data));
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="card bg-primary text-primary-content w-96">
          <div className="card-body">
            <h2 className="card-title">Profile</h2>
            <p>Welcome to your profile page!</p>

            {editMode ? (
              <form className="flex flex-col gap-4" onSubmit={handleProfileUpdate}>
                <input
                  className="input input-bordered text-gray-700"
                  type="text"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                />
                <input
                  className="input input-bordered text-gray-700"
                  type="text"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                />
                <input
                  className="input input-bordered text-gray-700"
                  type="number"
                  placeholder="Age"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                />
                <input
                  className="input input-bordered text-gray-700"
                  type="text"
                  placeholder="Gender"
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                />
                <input
                  className="input input-bordered text-gray-700"
                  type="text"
                  placeholder="About"
                  value={form.about}
                  onChange={(e) => setForm({ ...form, about: e.target.value })}
                />
                <input
                  className="input input-bordered text-gray-700"
                  type="email"
                  placeholder="Email"
                  value={form.emailId}
                  onChange={(e) => setForm({ ...form, emailId: e.target.value })}
                />
                <input
                  className="input input-bordered text-gray-700"
                  type="text"
                  placeholder="Skills"
                  value={form.skills}
                  onChange={(e) => setForm({ ...form, skills: e.target.value })}
                />
                <input
                  className="input input-bordered text-gray-700"
                  type="text"
                  placeholder="Photo URL"
                  value={form.photoUrl}
                  onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
                />

                <div className="card-actions justify-end">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <>
                {user.photoUrl && (
                  <div className="flex justify-center mb-4">
                    <img
                      src={user.photoUrl}
                      alt="Profile"
                      className="w-24 h-24 rounded-full border border-white shadow"
                    />
                  </div>
                )}
                <div>
                  {user.firstName && <p>First Name: {user.firstName}</p>}
                  {user.lastName && <p>Last Name: {user.lastName}</p>}
                  {user.emailId && <p>Email: {user.emailId}</p>}
                  {user.age && <p>Age: {user.age}</p>}
                  {user.gender && <p>Gender: {user.gender}</p>}
                  {user.about && <p>About: {user.about}</p>}
                  {user.skills && <p>Skills: {user.skills}</p>}
                </div>
                <div className="card-actions justify-end">
                  <button className="btn" onClick={() => setEditMode(true)}>
                    Edit Profile
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
