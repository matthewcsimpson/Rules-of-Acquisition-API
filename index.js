const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

// Set responses in JSON, and public folder.
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const rulesRouter = require("./routes/rulesRouter");

// Server Port
const port = process.env.PORT || 5555;

app.use((req, _res, next) => {
  console.log(`${Date.now()} incoming request at ${req.originalUrl}`);
  next();
});

app.get("/", (_req, res) => {
  res.send("This Server is Running!");
});

app.use("/rules", rulesRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
