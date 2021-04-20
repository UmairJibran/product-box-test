const express = require("express");
const Q = require("q");
const router = express.Router();

const log = console.log;

const crawler = require("./../crawler");

module.exports = () => {
	router.get("/", (req, res) => {
		const { address } = req.query;
		if (typeof address === "string") {
			Q.fcall(
				crawler(address)
					.then(response => {
						let listItems = [];
						listItems.push(`${address} - "${response}"`);
						return listItems;
					})
					.then(items => {
						return res.status(200).render("pages/", { items: items });
					})
					.catch(error => {
						res.status(404).render("pages/not-found");
					})
			).catch(_ => {
				res.status(404).render("pages/not-found");
			});
		} else getItems(address, res);
	});

	async function getItems(address, res) {
		let listItems = [];
		for (let i = 0; i < address.length; i += 1) {
			listItems.push(
				await crawler(address[i])
					.then(response => {
						return `${address[i]} - "${response}"`;
					})
					.catch(error => {
						res.status(404).send(error);
					})
			);
		}

		return res.status(200).render("pages/", { items: listItems });
	}
	return router;
};
