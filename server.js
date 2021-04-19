const Express = require("express"); // imports the express package from npmjs

const routes = require("./routes"); //imports the local routes

const log = console.log;

const app = Express(); // instantiate the app with express

const port = process.env.PORT || 3000; // fetch port from environment or assign 3000 if not found in the environment
app.use("/", routes());

app.listen(port, error => {
	if (error) log(error);
	log(`Listening on port ${port}`);
});
