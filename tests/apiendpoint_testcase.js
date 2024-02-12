// simple test case for api endpoint
const request = supertest(server);
const request = require('supertest');
const app = require('./app');

describe('GET /transfers', () => {
    it('JSON containing all transfers', async() => {
        const res = await request(app).get('/transfers');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('eventType','Transfer'); // basic test cases

    });
});

describe('GET /approvals', () => {
    it('JSON containing all approvals', async() => {
        const res = await request(app).get('/approvals');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('eventType','Approval');

    });
});

describe('GET /activity', () => {
    it('JSON containing all the activity', async() => {
        const res = await request(app).get('/activity');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('eventType','Activity');

    });
});