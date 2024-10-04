// // src/services/WebSocketService.ts

// import SockJS from "sockjs-client";
// import { Client, Stomp } from "@stomp/stompjs";

// interface ChatMessage {
//   senderId: number;
//   recipientId: number;
//   content: string;
// }

// let stompClient: Client | null = null;

// export const connect = (onMessageReceived: (message: ChatMessage) => void) => {
//   const socket = new SockJS("/ws"); // Replace '/ws' with your WebSocket endpoint
//   stompClient = Stomp.over(socket);

//   stompClient.connect(
//     {},
//     (frame) => {
//       console.log("Connected: " + frame);
//       stompClient.subscribe("/topic/messages", (message) => {
//         onMessageReceived(JSON.parse(message.body));
//       });
//     },
//     (error) => {
//       console.error("STOMP error", error);
//     }
//   );
// };

// export const sendMessage = (message: ChatMessage) => {
//   if (stompClient) {
//     stompClient.send("/app/send", {}, JSON.stringify(message));
//   }
// };

// export const disconnect = () => {
//   if (stompClient) {
//     stompClient.disconnect(() => console.log("Disconnected"));
//   }
// };
