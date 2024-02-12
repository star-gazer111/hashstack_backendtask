const Web3 = require('web3')
const MongoClient = require('mongodb').MongoClient;

const web3 = new Web3('https://ethereum-sepolia.publicnode.com	-endpoint');

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

const address1 = '0x13B97ca2361C4649eB254d4d5c2baa89fF3c96a6';
const address2 = '0x74AfD47aE0Cf11826d8c0F5B4c9f7868c76189aC';
const abi1 = [];
const abi2 = [];

const contract1 = new web3.eth.Contract(abi1, address1);
const contract2 = new web3.eth.Contract(abi2,address2)
// generated hashes(topics)
const eventApproval = web3.utils.keccak256('Approval(address,address,uint256');
const eventTransfer = web3.utils.keccak256('Transfer(address,address,uint256');

// approval event

contract1.events.Approval(
    {filter : {}, fromBlock: 'latest'}                 // adding parameters
).on('data', async(event)=>
{
    await event2Database(event, 'Approval', db)  ;                // calls block and waits for latest approval event emmitted

})
.on('error', console.error);

// transfer event

contract2.events.Transfer(
    {filter : {}, fromBlock: 'latest'}                 // adding parameters
).on('data', async(event)=>
{
    await event2Database(event, 'Transfer', db)  ;                // calls block and waits for latest transfer event emmitted

})
.on('error', console.error);

// saving event data to mongodb

async function event2Database (event, eventType, db){
    try{
         const collection = db.collection('events');
         await collection.insertOne({
            eventType: eventType,
            transactionHash : event.transactionHash,
            blockNumber : event.blockNumber,
            event : event.returnValues,
            timestamp : new Date()
         });
         console.log('Event saved to the database', event);
    }
    catch(error){
        console.error('error in event saving', error);
    }
}