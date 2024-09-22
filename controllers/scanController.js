
import { saveScanResult, getScanHistory } from '../models/scanModel.js';
import { generateAIRecommendation } from '../services/aiService.js';

export default async function scanRoutes(fastify, options) {
  fastify.post('/scan', async (req, reply) => {
    const scanData = req.body;
    const scanResultId = await saveScanResult(fastify, scanData);
    const recommendation = await generateAIRecommendation(fastify, scanResultId, scanData);

    reply.send({
      success: true,
      recommendation: recommendation, // Trả về đề xuất AI
    });
  });

  fastify.get('/history', async (req, reply) => {
    const history = await getScanHistory(fastify);
    reply.send(history); // Trả về lịch sử quét
  });
}


