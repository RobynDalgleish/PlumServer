const express = require('express');
const cors = require('cors');
const app = express();
const faker = require('faker');


const generateData = require('./utils');

app.use(cors());
app.get('/', (req, res) => res.send('Hello World!'));

// Get an array of all profiles
app.get('/api/profiles', (req, res) => {
  // create an empty array
  // run a loop 50 times
  // inside loop, generate new object (no seed thing)
  // at end of loop, push into empty array
  // res.json() that array
  const profiles = [];
  for (i = 1; i < 51; i++) { 
    let profile = generateData(i);
    profiles.push(profile);
  }
  res.json(profiles)
});


// Get a specific profile
app.get('/api/profiles/:id', (req, res) => {
  if (typeof Number(req.params.id) !== 'number') {
    return res.json({ error: 'Not a valid id' })
  }

  res.json(generateData(req.params.id));
});

app.listen(8080, () => console.log('Example app listening on port 8080!'));