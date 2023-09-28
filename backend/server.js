const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectToDB = require("./connectToDB");
dotenv.config();
connectToDB();

app.use(express.json());
app.use(cors());
const app = express();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
