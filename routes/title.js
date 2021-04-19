const express = require("express");
const router = express.Router();

const log = console.log;

const crawler = require("./../crawler");

module.exports = () => {
	router.get("/", (req, res) => {
		const { address } = req.query;
		let listItems = [];
		crawler(address)
			.then(response => {
				listItems.push(address + ' - "' + response + '"');
				return res.status(200).render("pages/", { items: listItems });
			})
			.catch(error => {
				res.status(404).send(error);
			});
	});
	return router;
};
