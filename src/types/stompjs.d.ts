declare module "@stomp/stompjs" {
  import SockJS from "sockjs-client";

  export interface StompSubscription {
    unsubscribe(): void;
  }

  export class Client {
    connect(
      headers: any,
      onConnect: (frame: any) => void,
      onError: (error: any) => void
    ): void;
    subscribe(
      destination: string,
      callback: (message: any) => void
    ): StompSubscription;
    send(destination: string, headers: any, body: string): void;
    disconnect(callback?: () => void): void;
  }

  export function Stomp(over: (socket: SockJS) => Client): Client;
}
