const prisma = require('../../../../shared/prismaClient');
const Evaluation = require('../../domain/entities/Evaluation');

class PrismaEvaluationRepository {
    async save(evaluation) {
        const data = evaluation.toPrimitives();
        await prisma.evaluation.create({ data });
    }

    async findByUser(userId) {
        const records = await prisma.evaluation.findMany({ where: { userId } });
        return records.map(
            (r) =>
                new Evaluation({
                    id: r.id,
                    userId: r.userId,
                    providerId: r.providerId,
                    score: r.score,
                    createdAt: r.createdAt,
                })
        );
    }
}

module.exports = PrismaEvaluationRepository;
