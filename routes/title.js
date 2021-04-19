const express = require("express");
const router = express.Router();

const crawler = require("./../crawler");

module.exports = () => {
	router.get("/", (req, res) => {
		const { address } = req.query;
		if (address.length > 1)
			address.forEach(address => {
				crawler(address);
			});
		else crawler(address);
		res.status(200).send(address);
	});
	return router;
};
