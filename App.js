import Fastify from 'fastify';
import dbConfig from './config/dbConfig.js'; // Import cấu hình database 
import scanRoutes from './routes/scanRoutes.js'; // Import các route liên quan đến quét


// Khởi tạo Fastify server
const fastify = Fastify({ logger: true });

// Đăng ký cấu hình database
fastify.register(dbConfig);

// Đăng ký route cho quét và đề xuất.
fastify.register(scanRoutes, { prefix: '/scan' });

// Khởi động server Fastify
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server chạy trên cổng 3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// Gọi hàm khởi động server
start();

