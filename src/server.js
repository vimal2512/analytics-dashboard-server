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

    /*
    Create HTTP server
    */

    const server = http.createServer(app);

    /*
    Attach Socket.IO
    */

    const io = new Server(server, {
      cors: {
        origin: "https://task-tracker-olive-eta.vercel.app*"
      }
    });

    /*
    Make io accessible globally
    */

    global.io = io;

    io.on("connection", (socket) => {
      console.log("Dashboard connected:", socket.id);
    });

    /*
    Start server
    */

    server.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });

  } catch (error) {

    console.error("Server failed to start", error);

    process.exit(1);

  }

}

startServer();