const express = require("express");
require("./db/conn")
const StudentRouter = require("./routers/student")

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res)=>{
    res.send("Welcome to RESTful API")
})

app.use(express.json());

app.use(StudentRouter) //Created Routing


app.listen(port, ()=>{
    console.log(`Server is running at port no ${port}`)
})
