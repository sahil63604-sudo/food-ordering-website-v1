const express = require("express");
const router = express.Router();

const { getDashboard } = require("../controller/dashboardController");

router.get("/dashboard", getDashboard);

module.exports = router;