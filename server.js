require('dotenv').config()
const express = require("express"),
        cors = require("cors"),
        app = express()

let corsOptions = {
  origin: "*"
}


app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
  res.json({message: "Welcome to PARK MANAGER API."})
})
require("./app/routes/parking.routes.js")(app)
require("./app/routes/user.routes.js")(app)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server is running on port ${'"http://localhost:' + PORT}.`)
})
