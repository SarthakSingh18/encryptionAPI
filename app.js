const express=require('express');
const app=express();
const encrypt=require('./routes/encrypt');
const decrypt=require('./routes/decrypt');
const port=4000||process.env.port;
require('dotenv').config();
app.use('/encrypt',encrypt);
app.use('/decrypt',decrypt);
app.post('*',(req,res)=>{
    res.status(404).send({error:'You hit the end of internet'})
})
app.get('*',(req,res)=>{
    res.status(404).send({error:'You hit the end of internet'})
})
app.listen(port,()=>{
    console.log(`listeinig at ${port}`)
});