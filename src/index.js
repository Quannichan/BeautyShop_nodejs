const express = require("express")
const app = express()
const http = require("http")
const port = process.env.PORT || 3000
const bodyParser = require('body-parser');
const session = require("express-session")
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        secret : "admin121212",
        resave : false,
        saveUninitialized : false,
        islogin : false
    })
)
app.set('view engine', 'ejs')
app.set("views", "view")


const loginRoute = require("../controller/loginCotroller")
const OrderRoute = require("../controller/orderController")
const CustomerRoute = require("../controller/customerController")

app.use("/admin" , [loginRoute,OrderRoute, CustomerRoute])


const server = http.createServer(app)

server.listen(port , ()=>{
    console.log(`App listen on port ${port}`)
})