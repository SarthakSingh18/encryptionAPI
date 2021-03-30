const express = require("express");
const route = express.Router();
const apiCall = require("../apiCall");
const verifyapi = require("../public/js/keyVerify");
route.get("/", verifyapi.verifyApi, (req, res) => {
      apiCall
        .decryptapi(req, res)
        .then(function (result) {
          const buffer = Buffer.from(result.plaintext, "base64");
          const text = buffer.toString("ascii");
          res.send({ value: text }).status(200);
        })
        .catch(function (error) {
          res.send("some error occured").status(500);
        });
    });
module.exports = route;
