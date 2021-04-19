const express = require("express");
const router = express.Router();

const want = require("./want");

module.exports = () => {
	router.use("/want", want());
	return router;
};
