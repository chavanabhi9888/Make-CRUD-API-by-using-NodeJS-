const express =  require("express");
const app = express();
const user = require("./models/users");
const db = require("./database/user");

const PORT = 8000

const myrouter = require('./routes/users')
app.use(express.json())

app.use(myrouter)

app.listen(PORT , console.log(`this server is working on ${PORT}`))




