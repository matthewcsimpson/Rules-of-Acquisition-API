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
const episodesRouter = require("./routes/episodesRouter");

// Database client, used by the readiness check below.
const db = require("./db");

// Server Port
const port = process.env.PORT || 5555;

// Middleware, checks if the request as a valid API key.
app.use(async (req, _res, next) => {
  console.info(`${Date.now()} incoming request at ${req.url}`);
  next();
});

// Readiness check — reports unavailable when the database can't be reached,
// rather than answering 200 while broken.
app.get("/health", async (_req, res) => {
  try {
    await db.raw("select 1");
    res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    res.status(503).json({ status: "unavailable" });
  }
});

// Rules Routes
app.use("/rules", rulesRouter);

// Episode Routes
app.use("/episodes", episodesRouter);

// Centralised error handler. Any handler rejection forwarded by
// asyncHandler lands here as a 500 instead of hanging the request.
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(port, () => {
  console.info(`[server]: Server is running at http://localhost:${port}`);
});
