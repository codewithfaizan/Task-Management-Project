const express = require("express");

const app = express();

const PORT = 3000;

app.get((req, res)=>{
    return res.send("Hello from the server side....");
})


app.listen(PORT, ()=>{
    console.log("Hello, you are listening the port: ", PORT);
})