const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { dbConnect } = require("./config/database");


const userRoutes = require("./routes/User");
const workExperience = require("./routes/ExperienceRoute");

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

//database connect
dbConnect();

//middlewares
app.use(express.json());
app.use(cookieParser());



app.use(
	cors({
		// frontend url
		origin:"*",
		credentials:true,
	})
)


//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1",workExperience);



//def route
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})