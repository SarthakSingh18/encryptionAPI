const MongoClient = require("mongodb").MongoClient;
exports.verifyApi = async (req, res, next) => {
  try {
    if (req.headers["apikey"] == null) {
      res.send({"error":"Must enter apikey in api header"}).status(500);
      return;
    }
    const client = await MongoClient.connect('mongodb+srv://root:NAyxFXlSoOaliUFX@cluster0-3fupj.mongodb.net/test?retryWrites=true&w=majority');
    const db = client.db('api');
    const collection = db.collection("apiKeys");
    const data=await req.headers['apikey'];
    const results=await collection.findOne({"apiKey":data});
    if (results == null) {
      res.send({"error":"api key is not valid"}).status(500);
      return;
    }
    else{
      next();
    }
    
  } catch (e) {
      res.send({'error':'Cannot verify key (Server is down)'}).status(500);
      console.log(e);
      return;
  }
};
