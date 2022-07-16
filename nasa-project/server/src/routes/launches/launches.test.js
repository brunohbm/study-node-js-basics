require('dotenv').config();
const request = require('supertest');
const app = require('../../app');
const { 
    mongoConnect,
    mongoDisconnect,
} = require('../../services/mongo');

describe('Test Launches API', () => {
    beforeAll(async () => {
        await mongoConnect();
    });

    afterAll(async () => {
        await mongoDisconnect();
    });

    describe('Test GET /launches', () => {
        test('It should respond with 200 success', async () => {
            await request(app)
                .get('/v1/launches')
                .expect('Content-Type', /json/)
                .expect(200);
        });
    });

    describe('Test POST /launch', () => {
        const launchWithoutDate = {
            rocket: 'NCC 1701-D',
            mission: 'USS Enterprise',
            destination: 'Kepler-62 f',
        };

        const completeLaunchData = {
            ...launchWithoutDate,
            launchDate: 'January 4, 2028'
        }

        test('It should respond with 201 created', async () => {
            const { body } = await request(app)
                .post('/v1/launches')
                .send(completeLaunchData)
                .expect('Content-Type', /json/)
                .expect(201);

            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date(body.launchDate).valueOf();

            expect(requestDate).toBe(responseDate);
            expect(body).toMatchObject(launchWithoutDate);
        });

        test('It should catch missing required properties', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchWithoutDate)
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toStrictEqual({
                error: 'Missing required launch properties: launchDate',
            });
        });

        test('It should catch invalid dates', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send({
                    ...launchWithoutDate,
                    launchDate: 'Invalid date',
                })
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toStrictEqual({
                error: 'Invalid launch date',
            });
        });
    });
});