import React from "react";
import Score from "../components/Score";

const Leaderboard = ({socket}) => {

  
  return (
    <div className="h-[100%] w-[100%]">
      <Score  socket={socket}/>
    </div>
  );
};

export default Leaderboard;
