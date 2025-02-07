const express = require("express");
const dotenv = require("dotenv");
const { generateUsername } = require("unique-username-generator");
const logger = require("./middleware/logger");
const asyncHandler = require("./middleware/async");
const jwt = require("jsonwebtoken");
const errorHandler = require("./middleware/error");
const ErrorResponse = require("./middleware/errorResponse");
const connectDB = require("./config/db");
const cors = require("cors");

// import models
const User = require("./models/User");
const Message = require("./models/Message");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());
// Enable CORS
app.use(cors());


app.use(logger);

const protect = asyncHandler(async (req, res, next) => {
  let token;
  // console.log(req.headers.authorization);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
});

// register
app.post(
  "/register",
  asyncHandler(async (req, res, next) => {
    const { password } = req.body;
    const username = generateUsername("_", 6);

    console.log(username);
    // Create user
    const user = await User.create({
      username,
      password,
    });
    res.json({
      success: true,
      username,
      message: `User created successfully with ${username}`,
    });
  })
);
// login
app.post(
  "/login",
  asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;
    // Find user by username
    const user = await User.findOne({ username }).select("+password");

    // Check if user exists and password is correct
    if (!user || !(await user.matchPassword(password))) {
      return next(new ErrorResponse("Invalid username or password", 401));
    }

    // Send JWT
    sendTokenResponse(user, 200, res);
  })
);
// send message
app.post(
  "/send",
  protect,
  asyncHandler(async (req, res, next) => {
    const { content } = req.body;
    const senderId = req.user._id;

    const users = await User.find({ _id: { $ne: senderId } });
    if (users.length === 0)
      return res.status(400).json({ error: "No users available" });

    const randomUser = users[Math.floor(Math.random() * users.length)];
    const newMessage = new Message({
      sender: senderId,
      receiver: randomUser._id,
      content,
    });

    await newMessage.save();
    res.json({ message: "Message sent successfully!" });
  })
);
// check inbox
app.get(
  "/inbox",
  protect,
  asyncHandler(async (req, res) => {
    const messages = await Message.find({ receiver: req.user.id })
      .populate("sender", "username")
      .sort({ timestamp: -1 });

    if (messages.length === 0) {
      return res.json({ hasMessages: false, message: "No messages found." });
    }

    res.json({
      hasMessages: true,
      count: messages.length,
      latestMessage: messages[0],
      messages,
    });
  })
);

app.get("/", async (req, res, next) => {
  res.json({ success: true, message: "hello world" });
});

const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
