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