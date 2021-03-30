const express = require("express");                        
const redis = require("redis");
const redisClient = redis.createClient({                            //redis config
  host: 'redis-server',
  port: 6379
})
redisClient.on('error',function(){
  console.log("Redis not connected");
})
const route = express.Router();
const api = require("../apiCall");
const verifyapi = require("../public/js/keyVerify");
route.get("/", verifyapi.verifyApi, (req, res, next) => { 
  var result;             
  redisClient.get(req.headers["apikey"], function (err, results) {
    result=results;
    if (err) {
      res.send("Server Error(connecting to redis)").status(500);
      return;
    } 
    else if (result >= 50) {
      res.send({"error":"limit exceeded"}).status(300);
      return;
    } 
    else {
        result++;
        redisClient.set(req.headers["apikey"], result);
      api
        .encryptapi(req, res)
        .then(function (result) {
          res.send({"value":result}).status(200);
        })
        .catch((error) => {
          res.send({"error":error}).status(500);
          console.log(error);
        })
    }
  });
});
module.exports = route;
