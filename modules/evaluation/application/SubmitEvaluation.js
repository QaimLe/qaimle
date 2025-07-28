class SubmitEvaluation {
    constructor(evaluationRepository) {
        this.evaluationRepository = evaluationRepository;
    }

    async execute({ userId, providerId, score }) {
        const Evaluation = require('../domain/entities/Evaluation');
        const evaluation = Evaluation.create({ userId, providerId, score });

        await this.evaluationRepository.save(evaluation);
        return evaluation;
    }
}

module.exports = SubmitEvaluation;
