const request = require("request");
module.exports = {
  encryptVault: function (data) {
    return new Promise(function (resolve, reject) {
      const options = {
        method: "post",
        url: "http://vault:8200/v1/transit/encrypt/orders",
        port: 443,
        headers: {
          "X-Vault-Token": "s.hlk42ytAOxfwnkE2HbB5OlGG",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        form: {
          plaintext: data,
        },
      };
      request(options, function (err, res, body) {
        if (err) {
          reject(err);
          console.log(err);
        } else if (body.includes("error")) {
          console.log(err);
          reject(err);
        } else {
          console.log(body);
          resolve(body);
        }
      });
    });
  },
  decryptVault: function (data) {
    return new Promise(function (resolve, reject) {
      const options = {
        method: "post",
        url: "http://vault:8200/v1/transit/decrypt/orders",
        port: 443,
        headers: {
          "X-Vault-Token": "s.hlk42ytAOxfwnkE2HbB5OlGG",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        form: {
          ciphertext: data,
        },
      };
      request(options, function (err, res, body) {
        if (err) {
          console.log(err);
          reject(err);
        } else if (body.includes("error")) {
          console.log(body);
          reject(err);
        } else {
          console.log(body);
          resolve(body);
        }
      });
    });
  },
};
