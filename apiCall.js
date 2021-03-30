const vaultApi = require("./public/js/vaultCall");
function encryptapi(req, res) {
  return new Promise(async (resolve, reject) => {
    if(req.headers["value"]!=undefined){
    const header = req.headers["value"];
    console.log(header);
    try{
    const data = Buffer.from(header).toString("base64");
    vaultApi
      .encryptVault(data)
      .then(function (result) {
        var obj = JSON.parse(result);
        resolve(obj.data.ciphertext);
      })
      .catch(function (error) {
        reject(error);
      });
    }catch(e){
      console.log("Error:",e);
      reject("Some error occured");
    }
  }
  else{
    reject("Please provide data in headers to encrypt");
  }
  });
}

function decryptapi(req, res) {
  return new Promise(async (resolve, reject) => {
    if(req.headers["value"]!=undefined){
    const header = req.headers["value"];
    console.log(header);
    vaultApi
      .decryptVault(header)
      .then(function (result) {
        var obj = JSON.parse(result);
        resolve(obj.data);
      })
      .catch(function (error) {
        reject(error);
      });
    }
    else{
      reject("Please provide value in headers to decrypt");
    }
  });
}
module.exports = { encryptapi, decryptapi };
