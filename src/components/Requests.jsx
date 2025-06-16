import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "./appConstants";

const Requests = () => {
  const [requests, setRequests] = React.useState([]);

  const fetchConnections = async () => {
    try {
      const response = await axios.get(
        BASE_URL+"/user/request/recieved",
        { withCredentials: true }
      );
      setRequests(response.data.requests);
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  const handleResponse = async (requestId, status) => {
    try {
      await axios.post(
        BASE_URL+`/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      fetchConnections();
    } catch (error) {
      console.error(`Error updating status to ${status}:`, error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Connection Requests
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div
              key={request._id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col space-y-4"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={request.fromUserId.photoUrl}
                  alt={`${request.fromUserId.firstName} ${request.fromUserId.lastName}`}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {request.fromUserId.firstName} {request.fromUserId.lastName}
                  </h3>
                  <p className="text-gray-600">Age: {request.fromUserId.age}</p>
                  <p className="text-gray-700">
                    Status:{" "}
                    <span className="font-medium text-blue-600">
                      {request.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Requested on:{" "}
                    {new Date(request.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {request.status === "interested" && (
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => handleResponse(request._id, "accepted")}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleResponse(request._id, "rejected")}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No connection requests found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Requests;
