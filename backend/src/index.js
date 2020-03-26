const express = require('express')
const routes = require('./routes')
const cors = require('cors');

const app = express();

app.use(cors())
   .use(express.json())
   .use(routes);

app.listen(3333);
