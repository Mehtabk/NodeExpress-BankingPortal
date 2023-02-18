const express = require("express");
const router = express.Router();
const { accounts, writeJSON } = require("../data");

router.get("/transfer", (req, res) => {
  res.render("transfer");
});

router.post("/transfer", function (req, res) {
  // code to transfer money between accounts will go here
  const from = req.body.from;
  const to = req.body.to;
  const amount = parseInt(req.body.amount);

  accounts[from].balance -= amount;
  accounts[to].balance += amount;
  writeJSON();

  res.render("transfer", { message: "Transfer Completed" });
});

// Route handler for payment page
router.get("/payment", (req, res) => {
  res.render("payment", { account: accounts.credit });
});

// Route handler for payment submission
router.post("/payment", (req, res) => {
  accounts.credit.balance -= parseInt(req.body.amount);
  accounts.credit.available += parseInt(req.body.amount);
  writeJSON();
  res.render("payment", {
    message: "Payment Successful",
    account: accounts.credit,
  });
});

module.exports = router;