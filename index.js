const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

// Set responses in JSON, and public folder.
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Routes
const rulesRouter = require("./routes/rulesRouter");

// Server Port
const port = process.env.PORT || 5555;

// Middleware, checks if the request as a valid API key.
app.use(async (req, _res, next) => {
  console.info(`${Date.now()} incoming request at ${req.url}`);
  next();
});

app.use("/rules", rulesRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
