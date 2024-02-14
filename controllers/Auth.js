const bcrypt = require("bcryptjs")
const User = require("../models/User")
const jwt = require("jsonwebtoken")
require("dotenv").config()


// Signup Controller for Registering USers
exports.signup = async (req, res) => {
    try {
      // Destructure fields from the request body
      const { name, email, phone, password, reEnterPassword } = req.body

      // Check if All Details are there or not
      if ( !name || !email || !phone || !password || !reEnterPassword ) {
        return res.status(403).send({
          success: false,
          message: "All Fields are required",
        })
      }

      // Check if password and confirm password match
      if (password !== reEnterPassword) {
        return res.status(400).json({
          success: false,
          message:
            "Password and Confirm Password do not match. Please try again.",
        })
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Employee already exists. Please register in to continue.",
        })
      }
  
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10)

      const user = await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${name }${" "}${name}`,
      })
  
     
      return res.status(200).json({
        success: true,
        user,
        message: "Employee registered successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Employee cannot be registered. Please try again.",
      })
    }
  }

// Login controller for authenticating users
exports.login = async (req, res) => {
    try {
      // Get email and password from request body
      const { email, password } = req.body
  
      // Check if email or password is missing
      if (!email || !password) {
        // Return 400 Bad Request status code with error message
        return res.status(400).json({
          success: false,
          message: `Please Fill up All the Required Fields`,
        })
      }
       
      //  const emailLowerCase=email.toLowerCase();
  
      // Find user with provided email
      const user = await User.findOne({ email})
  
      // If user not found with provided email
      if (!user) {
        // Return 401 Unauthorized status code with error message
        return res.status(401).json({
          success: false,
          message: `Employee is not Registered with Us Please SignUp to Continue`,
        })
      }
  
      // Generate JWT token and Compare Password
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign( { email: user.email, id: user._id}, process.env.JWT_SECRET)
  
        // Save token to user document in database
        user.token = token
        user.password = undefined
  
        res.cookie("token", token).status(200).json({
          success: true,
          token,
          user,
          message: `User Login Success`,
        })
      } else {
        return res.status(401).json({
          success: false,
          message: `Password is incorrect`,
        })
      }
    } catch (error) {
      console.error(error)
      // Return 500 Internal Server Error status code with error message
      return res.status(500).json({
        success: false,
        message: `Login Failure Please Try Again`,
      })
    }
  }

