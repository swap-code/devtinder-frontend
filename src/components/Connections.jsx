import axios from 'axios';
import React, { use, useEffect } from 'react'

const Connections = () => {
const [connections, setConnections] = React.useState([]);
const fetchConnections = async () => {
    try {
        const response = await axios.get("http://localhost:3000/user/connections", { withCredentials: true });
        setConnections(response.data.connections || []);
    } catch (error) {
        console.error("Error fetching connections:", error);
    }
}
    useEffect(() => {
        fetchConnections();
    }, []);
  return (
  <div className="flex flex-wrap justify-center gap-6 p-8 bg-gradient-to-br from-pink-100 via-red-100 to-yellow-50 min-h-screen">
  {connections.length === 0 ? (
    <div className="text-gray-500 text-lg">No connections found.</div>
  ) : (
    connections.map((conn, idx) => {
      const from = conn.fromUserId;
      const to = conn.toUserId;
      return (
<div key={idx} className="card w-96 bg-white shadow-xl rounded-xl border border-red-200 overflow-hidden flex flex-col justify-between">

          <div className="flex items-center gap-4 p-4 bg-yellow-50 border-t border-red-100">
            <img src={to.photoUrl} alt={to.firstName} className="w-16 h-16 rounded-full object-cover border-2 border-yellow-200" />
            <div>
              <div className="font-bold text-lg text-yellow-700">{to.firstName} {to.lastName}</div>
              <div className="text-gray-600 text-sm">Age: {to.age}</div>
            </div>
          </div>
          <div className="p-4 text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 font-semibold text-xs uppercase tracking-wider">{conn.status}</span>
          </div>
        </div>
      );
    })
  )}
</div>
  )
}

export default Connections
