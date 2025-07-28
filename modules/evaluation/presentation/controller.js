// src/modules/evaluation/presentation/controller.js
const prisma = require('../../../shared/prismaClient');

exports.submitEvaluation = async (req, res) => {
    console.log(req);

    const { userId, providerId, score } = req.body;

    try {
        await prisma.evaluation.create({
            data: {
                userId,
                providerId,
                score,
            },
        });

        res.status(201).json({ message: 'Evaluation submitted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};



const PrismaEvaluationRepository = require('../../evaluation/infrastructure/repositories/PrismaEvaluationRepository');
const SubmitEvaluation = require('../../evaluation/application/SubmitEvaluation');

const repo = new PrismaEvaluationRepository();
const submitEvaluation = new SubmitEvaluation(repo);

exports.submit = async (req, res) => {
    try {
        const { userId, providerId, score } = req.body;
        const result = await submitEvaluation.execute({ userId, providerId, score });

        res.status(201).json({ message: 'Evaluation saved', data: result.toPrimitives() });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};
