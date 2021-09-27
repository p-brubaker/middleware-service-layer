import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('middleware service layer', () => {
    beforeEach(async () => {
        await setup(pool);
        const comments = await Promise.all([
            { id: '1', comment: 'puppies are great!', toxic: false },
            { id: '2', comment: 'your a poophead!', toxic: true },
        ]);
        await comments.forEach((comment) => {
            request(app).post('api/v1/comments').send(comment);
        });
    });

    it('should retrieve a comment from the database', async () => {
        const res = await request(app).get('api/v1/comments/1');
        expect(res).toEqual({
            id: '1',
            comment: 'puppies are great!',
            toxic: false,
        });
    });

    afterAll(() => {
        pool.end();
    });
});
