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

    static async getAllComments() {
        const { rows } = await pool.query('SELECT * FROM comments');
        return rows.map((row) => new Comment(row));
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

    static async deleteComment(id) {
        try {
            await pool.query(
                `DELETE FROM
                comments
                WHERE comments.id=$1`,
                [id]
            );
            return 'item successfully deleted';
        } catch (err) {
            return err;
        }
    }
}
