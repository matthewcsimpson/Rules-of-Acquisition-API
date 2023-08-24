const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

// Set responses in JSON, and public folder.
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const rulesRouter = require("./routes/rulesRouter");

const { checkApiKey } = require("./utilities/checkApiKey");

// Server Port
const port = process.env.PORT || 5555;

app.use(async (req, res, next) => {
  console.info(`${Date.now()} incoming request at ${req.url}`);
  if (await checkApiKey(req.headers["api_key"])) {
    console.info(`VALID API KEY`);
    next();
  } else {
    res.json("Invalid API Key");
  }
});

app.get("/", (_req, res) => {
  res.send("This Server is Running!");
});

app.use("/rules", rulesRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
