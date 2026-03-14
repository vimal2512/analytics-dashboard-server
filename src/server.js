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

    /*
    Allowed socket origins
    */

    const allowedOrigins = [
      "https://task-tracker-olive-eta.vercel.app",
      "https://analytics-dashboard-client-q0ifa7ij8.vercel.app"
    ];

    const io = new Server(server, {
      cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"]
      }
    });

    global.io = io;

    io.on("connection", (socket) => {
      console.log("Dashboard connected:", socket.id);
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