const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

const employRoute = require("./routes/employRoute");


app.use(express.json());
app.use(cors());
app.use("/employs",employRoute);



app.listen(port,()=>{
    console.log(`Server running on ${port}`);
})