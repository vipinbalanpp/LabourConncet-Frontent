import {
  faEllipsisV,
  faPaperclip,
  faPaperPlane,
  faSmile,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import image from "../../assets/user.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import { RootState } from "../../redux/store";
import { Stomp } from "@stomp/stompjs";

const Messages = ({ recipient }: any) => {
  const [message, setMessage] = useState("");
  const user = useSelector((state: RootState) => state.user);
  const [chatHistory, setChatHistory] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [previousUsers, setPrevoiousUsers] = useState(null);
  useEffect(() => {
    // Fetch chat history from the backend
    getPreviousChatUsersList();
    getChatHistory();
    // WebSocket connection setup
    const socket = new SockJS("http://localhost:8087/ws");
    const client = Stomp.over(socket);
    client.connect({}, () => {
      client.subscribe(`/topic/messages/${user?.id}`, (msg) => {
        const newMessage = JSON.parse(msg.body);
        setChatHistory((prev) => [...prev, newMessage]);
      });
    });
    setStompClient(client);

    // Cleanup function
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [user?.id, recipient]);

  const getChatHistory = () => {
    axios
      .get("http://localhost:8087/chat/api/v1/history", {
        params: {
          senderId: user.id,
          senderRole: user.role,
          receiverId: 6,
        },
      })
      .then((response) => {
        setChatHistory(response.data);
        console.log("chat history : ", response.data);
      })
      .catch((error) => {
        console.error("Error fetching chat history:", error);
      });
  };
  const getPreviousChatUsersList = () => {
    console.log("in users list method");

    axios
      .get("http://localhost:8087/chat/api/v1/previousChatUsersList", {
        params: {
          senderId: user?.id,
          senderRole: user?.role,
        },
      })
      .then((response) => {
        console.log("users list", response.data);
        setPrevoiousUsers(response.data);
      });
  };

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const newMessage = {
      senderId: user.id,
      receiverId: 1,
      senderRole: user.role,
      content: message,
      timestamp: new Date().toISOString(),
      isRead: false,
    };

    // Send message over WebSocket
    stompClient.send("/app/send", {}, JSON.stringify(newMessage));

    // Update local chat history
    setChatHistory((prevHistory) => [...prevHistory, newMessage]);

    setMessage("");
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar for Messages List */}
      <div className="w-1/3 p-4 bg-gray-100 border-r-2 overflow-y-auto">
        <input
          type="text"
          placeholder="Search"
          className="border bg-white h-10 mb-6 placeholder:text-sm px-4 py-2 w-full rounded"
        />
        {/* Sample Messages */}
        {previousUsers &&
          previousUsers.map((user) => (
            <div
              key={user.id}
              className="border-b-2 flex p-3 gap-4 items-center mt-2"
            >
              <img
                className="w-12 h-12 rounded-full"
                src={user.profileImageUrl}
                alt=""
              />
              <div className="flex flex-col w-full">
                <p className="text-sm font-semibold text-black">{user.name}</p>
                <p className="text-xs text-gray-500">12 Min ago</p>
              </div>
            </div>
          ))}
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-col w-2/3">
        {/* Chat Header */}
        <div className="flex justify-between items-center border-b-2 p-4 bg-white">
          <div className="flex items-center gap-4">
            <img src={image} alt="" className="w-14 h-14 rounded-full" />
            <p className="text-black font-semibold text-lg">Jan Meyer</p>
          </div>
          <div className="flex gap-4">
            <FontAwesomeIcon icon={faVideo} className="text-gray-600" />
            <FontAwesomeIcon icon={faEllipsisV} className="text-gray-600" />
          </div>
        </div>
        {/* Chat Messages Display */}
        <div className="flex-grow p-4 bg-white overflow-y-auto">
          {/* This is where you would map over your messages */}
          <p className="text-center text-gray-400">No messages yet...</p>
        </div>
        <div className="flex-grow p-4 bg-white overflow-y-auto">
          {chatHistory.length > 0 ? (
            chatHistory.map((msg, index) => (
              <div key={index} className="p-2">
                <p
                  className={`font-semibold ${
                    msg.senderId === user.id ? "text-right" : "text-left"
                  }`}
                >
                  {msg.content}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(msg.timestamp).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No messages yet...</p>
          )}
        </div>
        {/* Message Input */}
        <div className="border-t-2 p-4 bg-gray-50 flex items-center">
          <FontAwesomeIcon icon={faPaperclip} className="text-gray-600" />
          <input
            type="text"
            className="flex-grow bg-white mx-4 px-4 py-2 border rounded placeholder:text-sm"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <FontAwesomeIcon icon={faSmile} className="text-gray-600 mr-3" />
          <FontAwesomeIcon
            icon={faPaperPlane}
            className="text-white bg-blue-500 px-3 py-2 rounded-full"
            onClick={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Messages;
