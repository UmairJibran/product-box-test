const https = require("https"); // imports the https library from nodejs core
const _ = require("lodash"); // imports the lodash library from npmjs
const title = require("./routes/title");

const log = console.log;

let titleGrabber = webUrl => {
	// function recieves url and callback function when title is grabbed
	return new Promise((resolve, reject) => {
		https
			.get(webUrl, res => {
				let title = "does not exist";
				return res
					.on("data", line => {
						line = _.trim(line.toString()); // converts the binary to human readble string and removes whitespace from around
						// check if the current line includes the title tag
						if (line.includes("<title>"))
							//if the current line includes the title tag find the starting and ending tag and grab whatever is in between
							title = _.split(_.split(line, "<title>")[1], "</title>")[0];
					})
					.on("end", () => resolve(title)); // when entire webpage is scrapped return the title to the callback function
			})
			.on("error", error => {
				reject(error);
			}); // returns title as default value of "does not exist" to the callback function when webpage is not found
	});
};

module.exports = async address => {
	// recieves only the address
	try {
		const title = await titleGrabber(address);
		return title;
	} catch (error) {
		return error;
	}
};
