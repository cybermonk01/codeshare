import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import ACTIONS from "../Actions";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { initSocket } from "../socket";

const EditorPage = () => {
  const socketRef = useRef(null, "socket");
  const reactNavigator = useNavigate();
  const location = useLocation();
  const { roomID } = useParams();

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("socket connection failed, try again later");
        reactNavigator("/");
      }
      socketRef.current.emit(ACTIONS.JOIN, {
        roomID,
        userName: location.state?.userName,
      });
    };
    init();
  }, []);

  const [clients, setClients] = useState([
    { socketId: 1, userName: "Jamie" },
    { socketId: 2, userName: "Jumbo" },
    { socketId: 3, userName: "mbo" },
  ]);

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img src="/code-sync.png" alt="logo" className="logoImage" />
          </div>
          <h3>Connected</h3>
          <div className="clientsList">
            {clients.map((client) => (
              <Client key={client.socketId} userName={client.userName} />
            ))}
          </div>
        </div>
        <button className="btn copyBtn">Copy Room Id</button>
        <button className="btn leaveBtn">Leave</button>
      </div>
      <div className="editorWrap">
        <Editor />
      </div>
    </div>
  );
};

export default EditorPage;
