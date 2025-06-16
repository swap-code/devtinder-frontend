import axios from "axios";
import React from "react";
import { removeFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";

const UserCard = ({ data }) => {
  console.log(data);
  const dispatch = useDispatch();
  const handleSendrequest = async (status, id) => {
    try {
      await axios.post(
        `http://localhost:3000/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(id));
    } catch (error) {
      console.error(`Error updating status to ${status}:`, error);
    }
  };
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-200 via-red-200 to-yellow-100">
      <div className="card m-4 bg-white w-96 shadow-xl rounded-2xl overflow-hidden border border-red-200 transition-transform transform hover:scale-105">
        <figure className="flex justify-center bg-red-100 p-4">
          <img
            src={
              data?.photoUrl && data.photoUrl !== ""
                ? data.photoUrl
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="user"
            className="rounded-full w-32 h-32 object-cover border-4 border-white shadow-md"
          />
        </figure>
        <div className="card-body p-6 text-center">
          <h2 className="card-title text-2xl font-bold text-red-600 mb-2">
            {data?.firstName} {data?.lastName}
          </h2>
          <h3 className="text-lg text-gray-700 mb-1">
            {data?.age || "age not available"}
          </h3>
          <p className="text-md text-gray-500 mb-1">
            {data?.gender || "gender not specified"}
          </p>
          <p className="text-md text-gray-500 mb-4">{data?.email}</p>
        </div>
        <div className="card-actions flex justify-center gap-4 pb-6">
          <button
            onClick={() => handleSendrequest("interested", data._id)}
            className="btn bg-red-400 hover:bg-red-500 text-white font-semibold px-6 py-2 rounded-full shadow transition"
          >
            Send request
          </button>
          <button
            onClick={() => handleSendrequest("ignore", data._id)}
            className="btn bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-2 rounded-full shadow transition"
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
