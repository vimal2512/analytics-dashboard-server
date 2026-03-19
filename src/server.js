// import app from "./app.js";
// import { connectDB } from "./config/database.js";
// import { env } from "./config/env.js";

// async function startServer() {
//     try {
//         await connectDB();

//         app.listen(env.port, () => {
//             console.log(`Server running on port ${env.port}`)
//         })
//     } catch (error) {
//         console.error("Server failed to start", error);

//         process.exit(1);
//     }
// }

// startServer();

import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import { connectDB } from "./config/database.js";
import { env } from "./config/env.js";

async function startServer() {
  try {
    await connectDB();

    const server = http.createServer(app);

    // ✅ FIXED SOCKET CORS (includes localhost)
    const io = new Server(server, {
      cors: {
        origin: [
          "http://localhost:5173",
          "https://task-tracker-olive-eta.vercel.app"
        ],
        methods: ["GET", "POST"],
        credentials: true
      }
    });

    global.io = io;

    // ✅ ACTIVE STATE
    const activeUsers = {};
    const activePages = {};

    io.on("connection", (socket) => {
      console.log("Socket connected:", socket.id);

      // ✅ USER ONLINE
      socket.on("user-online", ({ trackingId, sessionId, url }) => {

        if (!trackingId || !sessionId) return;

        // 🔥 store on socket for cleanup
        socket.trackingId = trackingId;
        socket.sessionId = sessionId;
        socket.url = url;

        if (!activeUsers[trackingId]) {
          activeUsers[trackingId] = new Set();
        }

        if (!activePages[trackingId]) {
          activePages[trackingId] = {};
        }

        activeUsers[trackingId].add(sessionId);

        if (!activePages[trackingId][url]) {
          activePages[trackingId][url] = new Set();
        }

        activePages[trackingId][url].add(sessionId);

        // 🔥 emit visitors
        io.emit("liveVisitors", activeUsers[trackingId].size);

        // 🔥 emit pages
        const pages = Object.entries(activePages[trackingId]).map(
          ([page, sessions]) => ({
            page,
            users: sessions.size
          })
        );

        io.emit("livePages", pages);
      });

      // ✅ FIXED DISCONNECT
      socket.on("disconnect", () => {

        const { trackingId, sessionId, url } = socket;

        if (!trackingId || !sessionId) return;

        activeUsers[trackingId]?.delete(sessionId);

        if (activePages[trackingId]?.[url]) {
          activePages[trackingId][url].delete(sessionId);
        }

        io.emit("liveVisitors", activeUsers[trackingId]?.size || 0);

        console.log("Socket disconnected:", socket.id);
      });
    });

    server.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });

  } catch (error) {
    console.error("Server failed to start", error);
    process.exit(1);
  }
}

startServer();