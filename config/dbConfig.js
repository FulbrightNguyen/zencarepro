import pkg from 'pg'; // Import the entire module as the default export
const { Pool } = pkg; // Destructure the Pool object from the imported module
import fastifyPlugin from 'fastify-plugin';

// Tạo kết nối PostgreSQL
async function dbConnector(fastify, options) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,  // URL kết nối database từ Render
  });

  fastify.decorate('pg', pool);  // Tạo property 'pg' để truy cập database

  // Kiểm tra kết nối
  try {
    await pool.connect();
    console.log('Successfully connected to PostgreSQL!');
  } catch (err) {
    fastify.log.error('Database connection failed:', err);
    process.exit(1);
  }
}

export default fastifyPlugin(dbConnector);
