const request = require('supertest');
const app = require('../app')

// Test to see if we get 200 response on /
describe('Test app.js ', () => {
    test('It should response the GET method with 200 status code', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
    test('Body of the GET method should have an array greater than 0', async () => {
        const response = await request(app).get('/');
        expect(response.body.length).toBeGreaterThan(0);
    });

});