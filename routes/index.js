const express = require("express");
const router = express.Router();

const i = require("./i");

module.exports = () => {
	router.use("/I", i());

	router.use("*", (req, res) => {
		return res.status(404).send("Not Found");
	});

	return router;
};
