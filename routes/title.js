const express = require("express");
const router = express.Router();

const log = console.log;

const crawler = require("./../crawler");

module.exports = () => {
	router.get("/", (req, res) => {
		const { address } = req.query;
		crawler(address)
			.then(response => {
				res.status(200).send(response);
			})
			.catch(error => {
				res.status(404).send(error);
			});
	});
	return router;
};
