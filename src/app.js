// Require the built-in 'fs' and 'path' libraries along with express
const fs = require('fs');
const path = require('path');
const express = require('express');

// Create an Express app
const app = express();

// Use the 'fs' and 'path' modules here...

// Set the views directory to the 'views' folder in the current directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to EJS
app.set('view engine', 'ejs');
const accountData = fs.readFileSync(path.join(__dirname, 'json/accounts.json'), 'utf8');
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(path.join(__dirname, 'json/users.json'), 'utf8');
const users = JSON.parse(userData);

app.get('/', (req, res) => {
    res.render('index', { title: 'Account Summary', accounts: accounts });
  });
  app.get('/savings', (req, res) => {
    res.render('account', { account: accounts.savings });
});
app.get('/checking', (req, res) => {
    res.render('account', { account: accounts.checking });
});
app.get('/credit', (req, res) => {
    res.render('account', { account: accounts.credit });
});
app.get('/profile', (req, res) => {
    res.render('profile', { user: users[0] });
  });
  app.listen(3000, () => {
    console.log('PS Project Running on port 3000!');
  });