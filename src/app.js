const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 6969;

const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'sepolia_events';

MongoClient.connect(mongoUrl, {useUnifiedTopology: true},(err,client)=>{
    if (err){
        console.error('Error in connecting', err);
        return;
    }
console.log("connected to mongodb");

});

const db = client.db(dbName);

/// GET ENDPOINT FOR TRANSFERS STORED IN DB

app.get('/transfers', async(req,res)=>{
try{
    const collection = db.collection('events');
    const transfers = await collection.find({ eventType:'Transfer'}).toArray();
    res.json(transfers);
}
catch(error){
    console.error('Error in fetching the transfers from database', error);
    res.status(500).json({error:'Internal error in server'});
    
}
});

/// GET ENDPOINT FOR APPROVALS STORED IN DB

app.get('/approvals', async(req,res)=>{
    try{
        const collection = db.collection('events');
        const approvals = await collection.find({ eventType:'Approval'}).toArray();
        res.json(approvals);
    }
    catch(error){
        console.error('Error in fetching the approvals from database', error);
        res.status(500).json({error:'Internal error in server'});
        
    }
    });

app.get('/activity', async(req,res)=>{
    try{
        const collection = db.collection('events');
        const activity = await collection.find({ eventType:'Activity'}).toArray();
        res.json(activity);
        }
    catch(error){
        console.error('Error in fetching the activity from database', error);
        res.status(500).json({error:'Internal error in server'});
            
        }
        });

    app.listen(port, ()=>{
        console.log('Server is live at port ${port} hurrayyy');
    });

