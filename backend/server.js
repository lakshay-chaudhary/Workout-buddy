const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

//app
const app = express();

//Routes import
const workoutRoutes = require("./Routes/workout");

//middleware
app.use(express.json());
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

//routes
app.use("/workout", workoutRoutes);

//connect DB
mongoose
	.connect(process.env.DB_URI)
	.then(() => {
		app.listen(process.env.PORT || 4000, () => {
			console.log("listening on 4000");
		});
	})
	.catch((err) => {
		console.log(err);
	});
