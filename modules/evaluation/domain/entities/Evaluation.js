const { randomUUID } = require('crypto');

class Evaluation {
    constructor({ id, userId, providerId, score, createdAt }) {
        this.id = id ?? randomUUID();
        this.userId = userId;
        this.providerId = providerId;
        this.score = score;
        this.createdAt = createdAt ?? new Date();

        this.validate();
    }

    validate() {
        if (!this.userId || !this.providerId) {
            throw new Error('User ID and Provider ID are required');
        }
        if (this.score < 1 || this.score > 5) {
            throw new Error('Score must be between 1 and 5');
        }
    }

    toPrimitives() {
        return {
            id: this.id,
            userId: this.userId,
            providerId: this.providerId,
            score: this.score,
            createdAt: this.createdAt,
        };
    }

    static create({ userId, providerId, score }) {
        return new Evaluation({ userId, providerId, score });
    }
}

module.exports = Evaluation;
