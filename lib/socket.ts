import { io } from "socket.io-client";
/** Cliente único para eventos task:updated, chat:message e notification:new. */
export const socket = typeof window === "undefined" ? null : io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001", { autoConnect: false, transports: ["websocket"] });
