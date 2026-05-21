require("dotenv").config();
const express = require ("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const connectDB = require ("./src/configs/database");
const authRoute = require ("./src/routes/authRoute");
const jobRoutes = require("./src/routes/jobRoute");
const userRoutes = require("./src/routes/userRoute");
const adminRoutes = require("./src/routes/adminRoute")

connectDB();

app.use ("/api", authRoute);
app.use("/api", jobRoutes);
app.use("/api", userRoutes);
app.use("/api", adminRoutes)



const PORT = process.env.PORT

app.listen (PORT , ()=> {
    console.log (`Server is running live on ${PORT}`)
})