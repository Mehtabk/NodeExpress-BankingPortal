// Require the built-in 'fs' and 'path' libraries along with express
const fs = require("fs");
const path = require("path");
const express = require("express");

// Create an Express app
const app = express();

// Use the 'fs' and 'path' modules here...

// Set the views directory to the 'views' folder in the current directory
app.set("views", path.join(__dirname, "views"));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Add the middleware to handle POST data
app.use(express.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set("view engine", "ejs");
const accountData = fs.readFileSync(
  path.join(__dirname, "json/accounts.json"),
  "utf8"
);
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(
  path.join(__dirname, "json/users.json"),
  "utf8"
);
const users = JSON.parse(userData);

app.get("/", (req, res) => {
  res.render("index", { title: "Account Summary", accounts: accounts });
});
app.get("/savings", (req, res) => {
  res.render("account", { account: accounts.savings });
});
app.get("/checking", (req, res) => {
  res.render("account", { account: accounts.checking });
});
app.get("/credit", (req, res) => {
  res.render("account", { account: accounts.credit });
});
app.get("/profile", (req, res) => {
  res.render("profile", { transfer: transfer });
});

app.get("/transfer", (req, res) => {
  res.render("transfer");
});

app.post("/transfer", function (req, res) {
  // code to transfer money between accounts will go here
  const from = req.body.from;
  const to = req.body.to;
  const amount = parseInt(req.body.amount);

  accounts[from].balance -= amount;
  accounts[to].balance += amount;

  const accountsJSON = JSON.stringify(accounts);

  fs.writeFileSync(
    path.join(__dirname, "json", "accounts.json"),
    accountsJSON,
    "utf8"
  );

  res.render("transfer", { message: "Transfer Completed" });
});

// Route handler for payment page
app.get("/payment", (req, res) => {
  res.render("payment", { account: accounts.credit });
});

// Route handler for payment submission
app.post("/payment", (req, res) => {
  accounts.credit.balance -= parseInt(req.body.amount);
  accounts.credit.available += parseInt(req.body.amount);

  // Save updated accounts to JSON file
  const accountsJSON = JSON.stringify(accounts, null, 4);
  fs.writeFileSync(
    path.join(__dirname, "/json/accounts.json"),
    accountsJSON,
    "utf8"
  );

  res.render("payment", {
    message: "Payment Successful",
    account: accounts.credit,
  });
});
app.listen(3000, () => {
  console.log("PS Project Running on port 3000!");
});
