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
// import Stomp from "@stomp/stompjs";
import { RootState } from "../../redux/store";

const Messages = ({ recipient }: any) => {
  const [message, setMessage] = useState("");
  const user = useSelector((state: RootState) => state.user);

  // useEffect(() => {
  //   const socket = new SockJS("/ws");
  //   const client = Stomp.over(socket);

  //   client.connect(
  //     {},
  //     (frame) => {
  //       console.log("Connected: " + frame);

  //       client.subscribe("/topic/messages", (message) => {
  //         const receivedMessage: ChatMessage = JSON.parse(message.body);
  //         setChatHistory((prev) => [...prev, receivedMessage]);
  //       });

  //       setStompClient(client);
  //     },
  //     (error) => {
  //       console.error("STOMP error", error);
  //     }
  //   );

  //   return () => {
  //     if (client) {
  //       client.disconnect();
  //       console.log("Disconnected");
  //     }
  //   };
  // }, []);

  // const handleSendMessage = async () => {
  //   if (message.trim() === "" || !recipient) return;

  //   const newMessage = {
  //     senderId: user?.id,
  //     recipientId: recipient.id,
  //     content: message,
  //   };

  //   try {
  //     const response = await axios.post("/api/chats/messages", newMessage);
  //     // setChatHistory(prev => [...prev, response.data]);
  //     console.log(response);

  //     setMessage("");
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   }
  // };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar for Messages List */}
      <div className="w-1/3 p-4 bg-gray-100 border-r-2 overflow-y-auto">
        <input
          type="text"
          placeholder="Search Message..."
          className="border bg-white h-10 mb-6 placeholder:text-sm px-4 py-2 w-full rounded"
        />
        {/* Sample Messages */}
        {Array(7)
          .fill()
          .map((_, i) => (
            <div
              key={i}
              className="border-b-2 flex p-3 gap-4 items-center mt-2"
            >
              <img className="w-12 h-12 rounded-full" src={image} alt="" />
              <div className="flex flex-col w-full">
                <p className="text-sm font-semibold text-black">Jan Meyer</p>
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

        {/* Message Input */}
        <div className="border-t-2 p-4 bg-gray-50 flex items-center">
          <FontAwesomeIcon icon={faPaperclip} className="text-gray-600" />
          <input
            type="text"
            className="flex-grow bg-white mx-4 px-4 py-2 border rounded"
            placeholder="Reply Message..."
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
