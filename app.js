const express = require('express');
var cors = require('cors');
const bodyParser = require("body-parser");
const controller = require("./controller");
const app = express();
const PORT = 3000;

// added all the neccessary middlewares
app.use(bodyParser.json());
app.use(cors());

// defined all the routes
app.get('/api/properties', controller.getAll);

app.get('/api/properties/:id', controller.getById); 

app.post('/api/properties', controller.create);

app.put('/api/properties/viewCount', controller.updateViewCount);

app.put('/api/properties/favourite', controller.updateFavourite);

app.delete('/api/properties/:id', controller.deleteById); 

// running the server on port 3000
app.listen(PORT);