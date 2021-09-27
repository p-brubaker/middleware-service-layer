import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('middleware service layer', () => {
    beforeEach(async () => {
        await setup(pool);
        return await Promise.all(
            [
                { comment: 'puppies are great!' },
                { comment: 'your a poophead!' },
            ].map((comment) => {
                return request(app).post('/api/v1/comments').send(comment);
            })
        );
    }, 10000);

    it('should retrieve a comment from the database', async () => {
        const res = await request(app).get('/api/v1/comments/1');
        expect(res.body).toEqual({
            id: '1',
            comment: 'puppies are great!',
            toxic: false,
        });
    }, 10000);

    it('should show a positive match for toxicity for a mean comment', async () => {
        const res = await request(app).get('/api/v1/comments/2');
        expect(res.body).toEqual({
            id: '2',
            comment: 'your a poophead!',
            toxic: true,
        });
    }, 10000);

    it('should patch a comment in the database and return the new comment', async () => {
        const res = await request(app).patch('/api/v1/comments/2').send({
            comment: 'Im sorry I was mean',
        });
        expect(res.body).toEqual({
            id: '2',
            comment: 'Im sorry I was mean',
            toxic: false,
        });
    }, 10000);

    it('should get all the comments', async () => {
        const res = await request(app).get('/api/v1/comments');
        expect(res.body).toEqual([
            { id: '1', comment: 'puppies are great!', toxic: false },
            { id: '2', comment: 'your a poophead!', toxic: true },
        ]);
    });

    it('should delete a comment by id', async () => {
        await request(app).delete('/api/v1/comments/2');
        const res = await request(app).get('/api/v1/comments');
        expect(res.body).toEqual([
            { id: '1', comment: 'puppies are great!', toxic: false },
        ]);
    }, 10000);

    afterAll(() => {
        pool.end();
    });
});
