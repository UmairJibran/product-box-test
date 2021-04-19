const express = require("express");
const router = express.Router();

const i = require("./i");

module.exports = () => {
	router.use("/I", i());
	return router;
};
