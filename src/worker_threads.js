const {Worker, isMainThread, parent, workerData} = require('worker_threads');
const express = require('mongodb');
const MongoClient = require('mongodb');

const app = express();

// writing the main thread that divides into child workers

if(isMainThread){
    const numWorkers = require('os').cpus().length();

    for(let i=0; i<numWorkers;i++){
        const worker = new Worker(__filename,{ workerData:{
            workerId : i
        }});
    }

}

else{
    // implemented the worker thread
const workerId = workerData.workerId;
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'sepolia_events_${workerId}';
MongoClient.connect(mongoUrl,{useUnifiedTOplogy: true}, async(err,client)=>{
if(err){
    console.error('Worker ${workerId} : ERROR IN CONNECTION');
    return;
}
console.log('Worker ${workerId}: Connected hurrayyy!');
});
const db = client.db(dbName);

// API endpoints & all the CRUD operations can be defined here

app.get('/transfers/${workerId}', async(req,res)=>{
    try{
        const collection= db.collection('transfers');
        const transfers = await collection.find({}).toArray;
        res.json(transfers);
    }
    catch(error){
      console.error('Worker ${workerId}: ERROR IN FETCHING TRANSFERS:', error);
      res.status(500).json({error: 'internal error'});

    }
});

app.get('/approvals/${workerId}', async(req,res)=>{
        try{
            const collection= db.collection('approvals');
            const approvals = await collection.find({}).toArray;
            res.json(approvals);
        }
        catch(error){
          console.error('Worker ${workerId}: ERROR IN FETCHING APPROVALS:', error);
          res.status(500).json({error: 'internal error'});
    
        }
});

app.get('/activity/${workerId}', async(req,res)=>{
    try{
        const collection= db.collection('activity');
        const activity = await collection.find({}).toArray;
        res.json(activity);
    }
    catch(error){
      console.error('Worker ${workerId}: ERROR IN FETCHING THE ACTIVITY:', error);
      res.status(500).json({error: 'internal error'});

    }
});

app.listen(1000 + workerId, () =>{
    console.log('Worker ${workerId}: Server is live yoyoo on port ${3000 + workerID}');
})

}


