const request = require('supertest');
const app = require('../server');

describe('API Tests', () => {

    test('GET / should return message', async () => {
        const res = await request(app).get('/');
        expect(res.text).toBe('Smart Food Delivery Backend Running!');
    });

    test('GET /menu should return menu items', async () => {
        const res = await request(app).get('/menu');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

});