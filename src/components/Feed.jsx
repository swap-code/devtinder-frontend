import React from "react";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./userCard";
import { BASE_URL } from "./appConstants";

const Feed = () => {
  const dispatch = useDispatch();
  const getFeed = async () => {
    try {
      const response = await axios.get(BASE_URL+"/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(response.data));
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };
  const feed = useSelector((store) => store.feed);
  React.useEffect(() => {
    getFeed();
  }, []);

  if (feed.length <= 0) {
    alert("hello")
    return <>
   <span>No more user left</span>
    </>;
  }
  return (
    <div>
      {feed?.data?.map((user) => (
        <UserCard key={user._id} data={user} />
      ))}
    </div>
  );
};

export default Feed;
