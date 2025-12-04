import {
  faEllipsisV,
  faPaperclip,
  faPaperPlane,
  faSmile,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import { RootState } from "../../redux/store";
import { Stomp } from "@stomp/stompjs";
import { useLocation } from "react-router-dom";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { IMessage, IPersonInfoForChat } from "../../interfaces/user";
import toast from "react-hot-toast";

const Messages = () => {
  const [message, setMessage] = useState("");
  const user = useSelector((state: RootState) => state.user);
  const [chatHistory, setChatHistory] = useState<IMessage[]>([]);
  const [stompClient, setStompClient] = useState(null);
  const [previousUsers, setPreviousUsers] = useState<
    IPersonInfoForChat[] | null
  >(null);
  const [currentChatUser, setcurrentChatUser] =
    useState<IPersonInfoForChat | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [deletionConfirmationModal, setDeletionConfirmationModal] = useState({
    visible: false,
    message: null,
  });

  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    message: null,
  });
  const [editMessage, setEditMessage] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<IMessage | null>(null);
  const currentChatUserRef = useRef<any>(null);
  const chatHistoryRef = useRef<any>([]);
  const stompClientRef = useRef<any>(null);
  const messageInputRef = useRef<HTMLInputElement | null>(null);
  const { state } = useLocation();
  const worker = state?.workerDetailsForChat;

  useEffect(() => {
    currentChatUserRef.current = currentChatUser;
  }, [currentChatUser]);

  useEffect(() => {
    const handleClick = () => closeContextMenu();
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (worker) {
      setcurrentChatUser(worker);
    }
    console.log("worker", worker);
    getPreviousChatUsersList();

    const socket = new SockJS("http://localhost:8087/ws");
    const client = Stomp.over(socket);
    stompClientRef.current = client;
    let subscription: any = null;
    let mounted = true;

    client.connect({}, () => {
      client.subscribe(`/topic/messages/${user?.id}`, (res) => {
        const newMessage: IMessage = JSON.parse(res.body);
        const opened = currentChatUserRef.current;
        console.log("Openend :{}", opened);
        if (opened && newMessage.senderId === Number(opened.id)) {
          setChatHistory((prev) => {
            const exists = prev.some((m) => m.id === newMessage.id);
            if (exists) return prev;
            const next = [...prev, newMessage];
            chatHistoryRef.current = next;
            return next;
          });
        } else {
          setPreviousUsers((prev) => {
            const list = Array.isArray(prev) ? [...prev] : [];
            const idx = list.findIndex((u) => {
              return Number(u.id) === newMessage.senderId;
            });
            if (idx === -1) {
              fetchAndPrependUser(newMessage);
              return list;
            }
            const existing = list[idx] || {};
            const updatedUser: IPersonInfoForChat = {
              ...existing,
              unreadCount: existing ? (existing.unreadCount || 0) + 1 : 1,
              lastMessage: newMessage.content,
              lastTimestamp: newMessage.timestamp,
            };

            const nextList = [
              updatedUser,
              ...list.slice(0, idx),
              ...list.slice(idx + 1),
            ];
            return nextList;
          });
          1;
        }
      });
    });
    setStompClient(client);

    // Cleanup function
    return () => {
      mounted = false;
      try {
        if (subscription) subscription.unsubscribe();
      } catch (e) {
        /* ignore unsubscribe errors */
      }
      try {
        if (stompClientRef.current) {
          stompClientRef.current.disconnect();
        }
      } catch (e) {
        /* ignore disconnect errors */
      } finally {
        stompClientRef.current = null;
      }
    };
  }, [user?.id, worker]);

  const fetchAndPrependUser = async (msg: IMessage) => {
    try {
      const partnerRole = msg.senderRole === "USER" ? "WORKER" : "USER";
      const response = await axios.get(
        "http://localhost:8087/chat/api/v1/userDetails",
        {
          params: {
            currentUserId: user?.id,
            userRole: partnerRole,
            partnerId: msg.senderId,
          },
        }
      );

      const newUser: IPersonInfoForChat = response.data;
      // ensure we don't duplicate if another message arrived while fetching
      setPreviousUsers((prev) => {
        const list = Array.isArray(prev) ? [...prev] : [];
        const exists = list.some((u) => u.id === newUser.id);
        if (exists) {
          // update the existing record instead of duplicating
          const idx = list.findIndex((u) => u.id === newUser.id);
          const existing = list[idx];
          const updated = {
            ...existing,
            lastMessage: newUser.lastMessage ?? existing.lastMessage,
            lastTimestamp: newUser.lastTimestamp ?? existing.lastTimestamp,
            unreadCount:
              (existing.unreadCount || 0) + (newUser.unreadCount || 0),
          };
          return [updated, ...list.slice(0, idx), ...list.slice(idx + 1)];
        }
        return [newUser, ...list];
      });
    } catch (err) {
      console.error("Error fetching user details for new message:", err);
    }
  };

  const getChatHistory = async (currentUser: IPersonInfoForChat) => {
    try {
      const response = await axios.get(
        "http://localhost:8087/chat/api/v1/history",
        {
          params: {
            senderId: user?.id,
            senderRole: user?.role,
            receiverId: currentUser.id,
          },
        }
      );

      const history: IMessage[] = response.data || [];
      // update state + ref
      setChatHistory(history);
      chatHistoryRef.current = history;
      setEditMessage(false);
      setMessage("");
      console.log("chat history : ", history);

      // return the loaded history so callers can act immediately
      return history;
    } catch (error) {
      console.error("Error fetching chat history:", error);
      return [] as IMessage[];
    }
  };

  const getPreviousChatUsersList = () => {
    axios
      .get("http://localhost:8087/chat/api/v1/previousChatUsersList", {
        params: {
          senderId: user?.id,
          senderRole: user?.role,
        },
      })
      .then((response) => {
        let list = response.data;
        console.log("Partners: {}", response.data);
        if (worker) {
          const name = worker.name;
          const filteredList = list.filter((u) => u.name !== name);
          list = [worker, ...filteredList];
        }
        setPreviousUsers(list);
      })
      .catch((error) => {
        console.error("Error fetching chat users list:", error);
      });
  };

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    const newMessage = {
      id: selectedMessage ? selectedMessage.id : null,
      senderId: user?.id,
      receiverId: currentChatUser?.id,
      senderRole: user?.role,
      content: message,
      timestamp: new Date().toISOString(),
      isRead: false,
    };
    if (!editMessage) {
      stompClient.send("/app/send", {}, JSON.stringify(newMessage));
      setChatHistory((prevHistory) => [...prevHistory, newMessage]);
      chatHistoryRef.current = [...chatHistory, newMessage];
      console.log("sending message............", newMessage);
    } else {
      stompClient.send("/app/edit", {}, JSON.stringify(newMessage));
      setChatHistory((prevHistory) => [...prevHistory, newMessage]);
      chatHistoryRef.current = [...chatHistory, newMessage];
      console.log("sending message............", newMessage);
      toast.success("message edited successfully");
    }
    setMessage("");
  };

  const handleCurrentChatUserSetUp = async (user: IPersonInfoForChat) => {
    setcurrentChatUser(user);
    const history = await getChatHistory(user);
    console.log("history: ", history);
    const unreadMessageIds = (history || [])
      .filter((msg) => msg.senderId === Number(user?.id) && msg.read === false)
      .map((msg) => msg.id);
    console.log(
      "Message ids for read true :: {}",
      unreadMessageIds,
      chatHistory
    );
    markConversationAsRead(unreadMessageIds);
    messageInputRef.current?.focus();
  };

  const markConversationAsRead = (messageIds: string[]) => {
    console.log("in mark read method");
    const payload: any = {
      messageIds: messageIds,
    };
    try {
      stompClientRef.current?.send(
        "/app/mark-read",
        {},
        JSON.stringify(payload)
      );
      console.log("done read msg");
    } catch (err) {
      // fallback: use REST if socket unavailable
      console.log("Error occured while reading messages :: {}", err);
    }
  };
  const closeContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, message: null });
  };

  return (
    <>
      <div className="flex h-screen">
        {/* Left Sidebar for Messages List */}
        <div className="w-1/3 p-4 bg-gray-100 border-r-2 flex flex-col">
          <h1 className="font-bold text-gray-600 text-xl p-5">Chats</h1>

          <input
            type="text"
            placeholder="Search"
            className="border bg-white h-10 mb-6 placeholder:text-sm px-4 py-2 w-full rounded"
          />

          {/* Scrollable users list */}
          <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hidden">
            {previousUsers &&
              previousUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleCurrentChatUserSetUp(user)}
                  className="border-b-2 flex p-3 gap-4 items-center mt-2 cursor-pointer hover:bg-gray-50"
                >
                  <div className="relative">
                    {user.profileImageUrl ? (
                      <img
                        className="w-12 h-12 rounded-full object-cover"
                        src={user.profileImageUrl}
                        alt={user.name}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center">
                        <span className="text-xl font-semibold text-white">
                          {user.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}

                    {/* unread badge */}
                    {user.unreadCount > 0 && (
                      <span
                        className="absolute -top-1 -right-1 min-w-[20px] px-1.5 h-5 rounded-full flex items-center justify-center text-xs font-semibold bg-green-600 text-white"
                        aria-label={`${user.unreadCount} unread messages`}
                      >
                        {user.unreadCount > 99 ? "99+" : user.unreadCount}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col w-full">
                    <p className="text-sm font-semibold text-black">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500">12 Min ago</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Main Chat Area */}
        {currentChatUser && (
          <div className="flex flex-col w-2/3">
            {/* Chat Header */}
            <div className="flex justify-between items-center border-b-2 p-4 bg-white">
              <div className="flex items-center gap-4">
                <img
                  src={currentChatUser.profileImageUrl}
                  alt=""
                  className="w-14 h-14 rounded-full"
                  onClick={() => setShowImageModal(true)}
                />
                <p className="text-black font-semibold text-lg">
                  {currentChatUser.name}
                </p>
              </div>
              <div className="flex gap-4">
                <FontAwesomeIcon icon={faVideo} className="text-gray-600" />
                <FontAwesomeIcon icon={faEllipsisV} className="text-gray-600" />
              </div>
            </div>
            {/* Chat Messages Display */}
            <div className="flex-grow p-4 bg-white overflow-y-auto"></div>
            <div className="flex-grow p-4 bg-white overflow-y-auto">
              <div className="flex flex-col space-y-3 px-2 py-2">
                {chatHistory.map((msg, index) => {
                  const isOwnMessage = msg.senderRole === user?.role;

                  return (
                    <div
                      key={index}
                      className={`flex ${
                        isOwnMessage ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        onContextMenu={(e) => {
                          e.preventDefault(); // stops browser default menu
                          setContextMenu({
                            visible: true,
                            x: e.pageX,
                            y: e.pageY,
                            message: msg,
                          });
                        }}
                        className={`relative flex items-end max-w-xs md:max-w-md px-4 py-2 rounded-2xl shadow-sm ${
                          isOwnMessage
                            ? "bg-[#DCF8C6] text-gray-800 rounded-br-none"
                            : "bg-gray-200 text-gray-800 rounded-bl-none"
                        }`}
                      >
                        <div className="flex items-end gap-2">
                          <p className="break-words whitespace-pre-wrap text-sm leading-snug">
                            {msg.content}
                          </p>

                          {/* timestamp + tick container */}
                          <div className="flex items-end gap-1 ml-2 self-end">
                            <span className="text-[9px] whitespace-nowrap self-end text-gray-500">
                              {new Date(msg.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>

                            {/* show tick only for messages sent by current user */}
                            {isOwnMessage && <SeenEye isRead={!!msg.read} />}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div />
              </div>
              {chatHistory.length < 1 && (
                <p className="text-center text-gray-400">No messages yet...</p>
              )}
            </div>
            {editMessage && (
              <div className="w-full bg-yellow-100 border border-yellow-300 px-4 py-2 flex items-center justify-between rounded-t">
                <span className="text-sm text-gray-800">Editing message…</span>

                <button
                  onClick={() => {
                    setEditMessage(false);
                    setMessage("");
                    messageInputRef.current?.focus();
                  }}
                  className="text-gray-700 hover:text-black"
                >
                  ❌
                </button>
              </div>
            )}
            {/* Message Input */}
            <div className="border-t-2 p-4 bg-gray-50 flex items-center">
              <FontAwesomeIcon icon={faPaperclip} className="text-gray-600" />
              <input
                type="text"
                className="flex-grow bg-white mx-4 px-4 py-2 border rounded placeholder:text-sm text-black"
                placeholder="Message"
                value={message}
                ref={messageInputRef}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              {/* <FontAwesomeIcon icon={faSmile} className="text-gray-600 mr-3" /> */}
              <FontAwesomeIcon
                icon={faPaperPlane}
                className="text-white bg-blue-500 px-3 py-2 rounded-full"
                onClick={handleSendMessage}
              />
            </div>
          </div>
        )}
      </div>
      {showImageModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={currentChatUser?.profileImageUrl}
              alt="Profile Large"
              className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-lg"
            />

            {/* Close Button */}
            <button
              className="absolute top-2 right-2 bg-white p-2 rounded-full shadow"
              onClick={() => setShowImageModal(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {contextMenu.visible &&
        contextMenu.message.senderId != currentChatUser?.id && (
          <div
            className="absolute bg-white shadow-lg rounded-lg border z-50"
            style={{
              top: contextMenu.y,
              left: contextMenu.x,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={`flex items-center gap-2 w-full text-left px-4 py-2 text-sm 
    ${
      contextMenu?.message?.senderId !== user?.id
        ? "cursor-not-allowed opacity-50"
        : "hover:bg-gray-100"
    }
  `}
              onClick={() => {
                setEditMessage(true);
                setMessage(contextMenu.message.content);
                setSelectedMessage(contextMenu.message);
                closeContextMenu();
                messageInputRef.current?.focus();
              }}
            >
              <FontAwesomeIcon
                icon={faEdit}
                className="text-gray-600 text-xs"
              />
              <span className="text-black text-xs">Edit</span>
            </button>

            <button
              disabled={contextMenu.message.senderId !== user?.id}
              className={`flex items-center gap-2 w-full text-left px-4 py-2 text-sm 
    ${
      contextMenu.message.senderId !== user?.id
        ? "cursor-not-allowed opacity-50"
        : "hover:bg-gray-100"
    }
  `}
              onClick={() => {
                // open confirm modal with the message to delete
                setContextMenu((cm) => ({ ...cm, visible: false })); // close context menu
                setDeletionConfirmationModal({
                  visible: true,
                  message: contextMenu.message,
                });
              }}
            >
              <FontAwesomeIcon
                icon={faTrash}
                className="text-gray-600 text-xs"
              />
              <span className="text-black text-xs">Delete</span>
            </button>
          </div>
        )}
      {/* Confirm Delete Modal */}
      {deletionConfirmationModal.visible && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-delete-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() =>
              setDeletionConfirmationModal({ visible: false, message: null })
            }
          />

          {/* Modal box */}
          <div
            className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id="confirm-delete-title"
              className="text-lg font-semibold mb-2"
            >
              Delete message?
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete this message? This action cannot
              be undone.If you delete this message, it will also be removed from
              the <span>{user?.role === "USER" ? "worker" : "user"}</span>’s
              side.
            </p>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-md bg-white border hover:bg-gray-50 text-sm"
                onClick={() =>
                  setDeletionConfirmationModal({
                    visible: false,
                    message: null,
                  })
                }
              >
                Cancel
              </button>

              <button
                id="confirm-delete-btn"
                className="px-4 py-2 rounded-md bg-red-600 text-white text-sm shadow"
                onClick={() => {
                  console.log("Message deleted");
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Messages;

// small reusable tick component — blue for read, gray for sent (unread)
const SeenEye = ({ isRead }: { isRead?: boolean | null }) => {
  return (
    <span
      className={`ml-1 text-[12px] ${
        isRead ? "text-blue-500" : "text-gray-400"
      }`}
      title={isRead ? "Seen" : "Sent"}
    >
      {isRead ? "👀" : ""}
    </span>
  );
};
