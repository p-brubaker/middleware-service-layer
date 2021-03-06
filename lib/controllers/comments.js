import CommentService from '../services/CommentService.js';
import { Router } from 'express';

export default Router()
    .post('/', async (req, res, next) => {
        try {
            const comment = await CommentService.createComment(req.body);
            res.send(comment);
        } catch (err) {
            next(err);
        }
    })
    .get('/', async (req, res, next) => {
        try {
            const comments = await CommentService.getAllComments();
            res.send(comments);
        } catch (err) {
            next(err);
        }
    })
    .get('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const comment = await CommentService.getComment(id);
            res.send(comment);
        } catch (err) {
            next(err);
        }
    })
    .patch('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const comment = await CommentService.updateComment(id, req.body);
            res.send(comment);
        } catch (err) {
            next(err);
        }
    })
    .delete('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const result = await CommentService.deleteComment(id);
            res.send(result);
        } catch (err) {
            next(err);
        }
    });
