const mongoose = require("mongoose");

// Define the user schema using the Mongoose Schema 
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
		},
		phone: {
			type: String,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		reEnterPassword: {
			type: String,
		},
		image: {
			type: String,
			required: true,
		},
		token: {
			type: String,
		},
	},
	{ timestamps: true }  // Add timestamps for when the document is created and last modified
);

// Export the Mongoose model for the user schema
module.exports = mongoose.model("user", userSchema);