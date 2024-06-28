const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = require('./app');

const port = 3001;

mongoose.connect('mongodb://localhost:27017/movieapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
