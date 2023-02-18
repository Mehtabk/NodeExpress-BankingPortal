// Require the built-in 'fs' and 'path' libraries along with express
const fs = require("fs");
const path = require("path");
const express = require("express");
const { accounts, users, writeJSON } = require("./data");
const accountRoutes = require("./routes/accounts");
const servicesRoutes = require("./routes/services");
// Create an Express app
const app = express();

// Set the views directory to the 'views' folder in the current directory
app.set("views", path.join(__dirname, "views"));
// Set the view engine to EJS
app.set("view engine", "ejs");
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Add the middleware to handle POST data
app.use(express.urlencoded({ extended: true }));
app.use("/account",accountRoutes);
app.use("/services",servicesRoutes);
app.get("/", (req, res) => {
  res.render("index", { title: "Account Summary", accounts: accounts });
});
app.get("/profile", (req, res) => {
  res.render("profile", { transfer: transfer });
});
app.listen(3000, () => {
  console.log("PS Project Running on port 3000!");
});
