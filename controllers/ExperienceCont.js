const Experience = require("../models/Experience")

exports.experience = async (req, res) => {
    try {
      // Destructure fields from the request body
      console.log("gggggggggggggg")
      const { userid, company, role, firstDate, lastDate } = req.body

      // Check if All Details are there or not
      if ( !userid || !company || !role || !firstDate || !lastDate ) {
        return res.status(403).send({
          success: false,
          message: "All Fields are required",
        })
      }

      const user = await Experience.create({
        userid, company, role, firstDate, lastDate
      })
  
     
      return res.status(200).json({
        success: true,
        user,
        message: "work Experience save data successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "faild. Please try again.",
      })
    }
  }