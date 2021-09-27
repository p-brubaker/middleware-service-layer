import pool from '../utils/pool.js';

export default class Comment {
    constructor(row) {
        this.id = row.id;
        this.comment = row.comment;
        this.toxic = row.toxic;
    }

    static checkToxicity(comment) {
        return null;
    }

    static async insert({ comment, toxic }) {
        const { rows } = await pool.query(
            `INSERT INTO comments (
                comment, 
                toxic) VALUES ($1, $2) 
                RETURNING *;`,
            [comment, toxic]
        );
        return new Comment(rows[0]);
    }
}
