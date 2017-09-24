var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");


router.get("/", function(req, res) {
	res.redirect("/index");
});

//index page that grabs all the burgers
router.get("/index", function(req, res) {
	burger.all(function(data) {
		var obj = { burger: data };
		// console.log(obj);
		res.render("index", obj);
	});
});

//creates a new burger
router.post("/", function(req, res) {
	burger.create([
		"burger_name", "devoured"
	], [
		req.body.burger_name, false
	], function() {
		res.redirect("/");
	});
});

//updates burger eaten
router.put("/:id", function(req, res) {
	var condition = "id = " + req.params.id;

	console.log("condition", condition);

	burger.update({
		devoured: req.body.devoured
	}, condition, function() {
		res.redirect("/");
	});
});

//export routes for server.js to use
module.exports = router;