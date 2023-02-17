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

app.get('/', (req, res) => {
    res.render('index', { title: 'Index' });
  });
  app.listen(3000, () => {
    console.log('PS Project Running on port 3000!');
  });