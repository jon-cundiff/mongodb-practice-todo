require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = process.env.PORT || 5500;

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to DB.");
    app.listen(PORT, () => console.log(`Running on port ${PORT}`));
});
