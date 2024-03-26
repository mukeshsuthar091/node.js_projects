const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
// const cors = require('cors');
// const socketio = require("socket.io");
const http = require("http");

const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");

const app = express();
// app.options('*', cors());
// app.use(cors());

// ----------------
// const server = http.createServer(app);
// const io = socketio(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log(file);
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(bodyParser.urlencoded())  // x-mm-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    "mongodb+srv://nova:nova000@cluster0.uqrrthi.mongodb.net/messages?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((Result) => {
    console.log("Database connected successfully.");

    // websocket connection
    const server = http.createServer(app);
    const io = require("./socket").init(server);

    io.on("connection", (socket) => {
      console.log("Client connected.");
    });

    server.listen(8080, ()=>{
      console.log("Connection established successfully")
    });
  })
  .catch((err) => {
    console.log("Database connection failed.");
  });
