const express = require("express");
const axios = require("axios");
const router = require("./routes/index");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", router);

app.use((req, res) => {
  res.status(404).json({ status: false, message: "Route not found" });
});

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("We are here");
});
