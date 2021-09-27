import Comment from '../models/Comment.js';

export default class CommentService {
    static async createComment({ comment }) {
        const toxicity = Comment.checkToxicity(comment);
        const result = await Comment.insert({ comment, toxicity });
        return result;
    }
}
