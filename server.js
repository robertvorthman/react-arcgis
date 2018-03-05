const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

app.use('/data', express.static(path.join(__dirname, 'data')))

app.listen(port, () => console.log(`Listening on port ${port}`));