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

    const io = new Server(server, {
      cors: {
        origin: (origin, callback) => {

          if (!origin) return callback(null, true);

          if (
            origin.endsWith(".vercel.app") ||
            origin === "https://task-tracker-olive-eta.vercel.app"
          ) {
            return callback(null, true);
          }

          callback(new Error("CORS blocked"));

        },
        methods: ["GET", "POST"]
      }
    });

    global.io = io;

    /*
    Store active users per trackingId
    */

    const activeUsers = {};

    io.on("connection", (socket) => {

      console.log("Socket connected:", socket.id);

      /*
      User comes online from tracker
      */

      socket.on("user-online", ({ trackingId, sessionId }) => {

        if (!trackingId || !sessionId) return;

        if (!activeUsers[trackingId]) {
          activeUsers[trackingId] = new Set();
        }

        activeUsers[trackingId].add(sessionId);

        io.emit("liveVisitors", activeUsers[trackingId].size);

      });

      /*
      Handle disconnect
      */

      socket.on("disconnect", () => {

        for (const trackingId in activeUsers) {

          activeUsers[trackingId].delete(socket.id);

          io.emit("liveVisitors", activeUsers[trackingId].size);

        }

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