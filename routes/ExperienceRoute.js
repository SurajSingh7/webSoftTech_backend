const express = require("express")
const router = express.Router();

const { experience } = require("../controllers/ExperienceCont");
  
  
  router.post("/createExperience", experience);

  module.exports = router;