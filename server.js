const Express = require("express"); // imports the express package from npmjs
const path = require("path");

const routes = require("./routes"); //imports the local routes

const log = console.log;

const app = Express(); // instantiate the app with express

const port = process.env.PORT || 3000; // fetch port from environment or assign 3000 if not found in the environment

app.set("view engine", "ejs");
app.set(path.join(__dirname, "./views"));

app.use(Express.static(path.join(__dirname, "./static")));

app.use("/", routes());

app.use("*", (req, res) => {
	res.status(404);
	if (req.accepts("html")) {
		res.render("pages/not-found");
	}
});

app.listen(port, error => {
	if (error) log(error);
	log(`Listening on port ${port}`);
});
