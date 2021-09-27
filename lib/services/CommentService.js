import Comment from '../models/Comment.js';
import toxicity from '@tensorflow-models/toxicity';

export default class CommentService {
    static async checkToxicity(comment) {
        const threshold = 0.9;
        const toxic = await toxicity.load(threshold).then((model) => {
            const comments = [comment];
            return model.classify(comments).then((predictions) => {
                return predictions[6].results[0].match;
            });
        });
        return toxic;
    }
    static async createComment({ comment }) {
        const toxic = await this.checkToxicity(comment);
        const result = await Comment.insert({ comment, toxic });
        return result;
    }

    static async getComment(id) {
        return Comment.getComment(id);
    }

    static async getAllComments() {
        const result = await Comment.getAllComments();
        return result;
    }

    static async updateComment(id, { comment }) {
        const toxic = await this.checkToxicity(comment);
        const result = await Comment.updateComment({ id, comment, toxic });
        return result;
    }
}
