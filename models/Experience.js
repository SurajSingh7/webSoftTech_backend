const mongoose = require("mongoose");

// Define the user schema using the Mongoose Schema 
const experienceSchema = new mongoose.Schema(
	{
		userid: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
		},
		company: {
			type: String,
			required: true,
			trim: true,
		},
		role: {
			type: String,
			required: true,
			trim: true,
		},
		firstDate: {
			type: String,
			required: true,
			trim: true,
		},
		lastDate: {
			type: String,
			required: true,
			trim: true,
		}
	},
	{ timestamps: true }  
);


module.exports = mongoose.model("experience", experienceSchema);