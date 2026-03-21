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
import { isAllowedOrigin } from "./utils/cors.js";

async function startServer() {
  try {
    await connectDB();

    const server = http.createServer(app);

    const io = new Server(server, {
      cors: {
        origin: (origin, callback) => {
          if (isAllowedOrigin(origin)) {
            return callback(null, true);
          }
          callback(new Error("Socket CORS blocked"));
        },
        credentials: true
      }
    });

    global.io = io;

    const activeUsers = {};
    const activePages = {};

    io.on("connection", (socket) => {
      console.log("Socket connected:", socket.id);

      socket.on("user-online", ({ trackingId, sessionId, url }) => {

        if (!trackingId || !sessionId) return;

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

        io.emit("liveVisitors", activeUsers[trackingId].size);

        const pages = Object.entries(activePages[trackingId]).map(
          ([page, sessions]) => ({
            page,
            users: sessions.size
          })
        );

        io.emit("livePages", pages);
      });

      socket.on("disconnect", () => {

        const { trackingId, sessionId, url } = socket;

        if (!trackingId || !sessionId) return;

        activeUsers[trackingId]?.delete(sessionId);

        if (activePages[trackingId]?.[url]) {

          
          activePages[trackingId][url].delete(sessionId);
        }

        // 🔥 CLEANUP MEMORY
        if (activeUsers[trackingId]?.size === 0) {


          delete activeUsers[trackingId];
        }

        if (activePages[trackingId]) {
          for (const page in activePages[trackingId]) {
            if (activePages[trackingId][page].size === 0) {
              delete activePages[trackingId][page];
            }
          }

          if (Object.keys(activePages[trackingId]).length === 0) {
            delete activePages[trackingId];
          }
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