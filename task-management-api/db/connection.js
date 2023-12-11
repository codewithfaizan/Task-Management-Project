const mongoose = require("mongoose");
const env = require("dotenv").config();
const logger = require("../logger/logger");

module.exports =  function connectionConfig(){
    mongoose.connect(process.env.CONNECT_URL)
    .then((e)=>{
        logger.info(`Connect to mongoDb Server: ${e.connection.host}`)
        // console.log(`Connect to mongoDb: ${e.connection.host}`);
    })
    .catch((err)=>{
        console.log(err);
    })
}

