const express = require("express");
const router = express.Router();

const title = require("./title");

module.exports = () => {
	router.use("/title", title());
	return router;
};
