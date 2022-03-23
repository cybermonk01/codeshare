import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();

  const [roomID, setRoomID] = useState("");
  const [userName, setUserName] = useState("");

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();

    console.log(id);
    setRoomID(id);
    toast.success("Created a new Room");
  };

  const joinRoom = (e) => {
    if (!roomID || !userName) {
      toast.error(" ROOM ID  & user name is required");
      return;
    }

    navigate(`/editor/${roomID}`, {
      state: {
        userName,
      },
    });
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };
  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img
          className="homePageLogo"
          src="/code-sync.png"
          alt="code-sync-logo"
        />
        <h4 className="mainLabel"> Paste invitation Room ID</h4>
        <div className="inputGroup">
          <input
            type="text"
            className="inputBox"
            placeholder="Room ID"
            onChange={(e) => setRoomID(e.target.value)}
            value={roomID}
            onKeyUp={handleInputEnter}
          />
          <input
            type="text"
            className="inputBox"
            placeholder="USER NAME"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            onKeyUp={handleInputEnter}
          />
          <button className="btn joinBtn " onClick={joinRoom}>
            Join
          </button>

          <span className="createInfo">
            If you don't have an invite then create &nbsp;
            <a onClick={createNewRoom} href="" className="createNewBtn">
              new room
            </a>
          </span>
        </div>
      </div>
      <footer>
        <h4></h4>
      </footer>
    </div>
  );
};

export default Home;
