import scanRoutes from '../controllers/scanController.js';

export default async function routes(fastify, options) {
    fastify.post('/scan', scanRoutes);
}
