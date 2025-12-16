const express = require("express");
const { createContact } = require("../controller/contactController");

const router = express.Router();

router.post("/", createContact);

module.exports = router;
