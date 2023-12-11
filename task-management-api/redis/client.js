// const redis = require("redis");
// const logger = require("../logger/logger");

// // const REDIS_PORT = process.env.REDIS_PORT || 6379;
// // const REDIS_HOST = "103.217.132.19" || process.env.REDIS_HOST;
// const REDIS_URL = process.env.REDIS_URL || "redis://103.217.132.19:6379";

// const client = redis.createClient(REDIS_URL);

// client.connect();

// client.on("connect", (err) => {
//   if (err) {
//     logger.error(err.message);
//     console.log({error : err.message});
//   }

//   logger.info("Connected to the redis server");
//   console.log("Connected to the server");
// })

// module.exports = client;
