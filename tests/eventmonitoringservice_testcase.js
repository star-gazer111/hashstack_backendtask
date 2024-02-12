//  test cases for event monitoring service 
import { jest } from '@jest/globals'

const { event2Database} = require('./listener')

describe('Event Monitoring service', ()=>{
    it('saves the transfer event to our mongodb database', async()=>{
        const sampleEvent = {
            eventType: 'Transfer',
            transactionHash : '0xf97f7b095dd0a58212fff78e7a0d6977c26cd9f7831f17a47c79cc57fdef084d',
            blockNumber : '696969',
            event : 
            {
                total_amount : 100000,
                total_transfers : 28,
                total_unique_addresses : 12
            },
            timestamp : new Date()
        };

  // more events can be similarly written 
        
        const sampleDb = {
            collection : jest.fn().mockReturnThis(),
            insertOne: jest.fn().mockResolvedValueOnce({insertedCount:1})
        };
        await event2Database(sampleEvent,'Transfer',sampleDb);
        expect(sampleDb.collection).toBeCalledWith('events');
        expect(sampleDb.insertOne).toBeCalledWith(expect.objectContaining(sampleEvent));
    });
});