const request = require('supertest');
const app = require('../../app');

describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
        await request(app)
            .get('/launches')
            .expect('Content-Type', /json/)
            .expect(200);
    });
});

describe('Test POST /launch', () => {
    const launchWithoutDate = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        destination: 'Kepler-186 f',
    };

    const completeLaunchData = {
        ...launchWithoutDate,
        launchDate: 'January 4, 2028'
    }

    test('It should respond with 201 created', async () => {
        const { body } = await request(app)
            .post('/launches')
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
            .post('/launches')
            .send(launchWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400);

            expect(response.body).toStrictEqual({
                error: 'Missing required launch properties: launchDate',
            });
    });

    test('It should catch invalid dates', async () => {
        const response = await request(app)
        .post('/launches')
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