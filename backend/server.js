const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDB = require("./connectToDB");
dotenv.config();
connectToDB();
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/AuthRoutes"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
