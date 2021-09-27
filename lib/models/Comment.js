import pool from '../utils/pool.js';

export default class Comment {
    constructor(row) {
        this.id = row.id;
        this.comment = row.comment;
        this.toxic = row.toxic;
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

    static async getComment(id) {
        const { rows } = await pool.query(
            'SELECT * FROM comments WHERE id=$1',
            [id]
        );
        return new Comment(rows[0]);
    }

    static async updateComment({ id, comment, toxic }) {
        const { rows } = await pool.query(
            `UPDATE comments
            SET 
                comment=$1,
                toxic=$2
            WHERE comments.id=$3
            RETURNING *;`,
            [comment, toxic, id]
        );
        return new Comment(rows[0]);
    }
}
