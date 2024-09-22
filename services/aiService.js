// Giả lập logic AI đưa ra đề xuất dựa trên kết quả quét.
export const generateAIRecommendation = async (fastify, scanResultId, scanData) => {
  let recommendationText = '';

  // Giả lập logic AI để tạo ra đề xuất.
  if (scanData.junk_files_count > 50) {
    recommendationText += 'Consider deleting junk files to free up space. ';
  }
  if (!scanData.antivirus_protection_status) {
    recommendationText += 'Enable antivirus protection to secure your device. ';
  }
  if (!scanData.firewall_status) {
    recommendationText += 'Enable the firewall for better protection. ';
  }

  const query = `
    INSERT INTO ai_recommendations (scan_result_id, recommendation_text, recommendation_type)
    VALUES ($1, $2, $3);
  `;
  const values = [scanResultId, recommendationText.trim(), 'system_optimization'];

  await fastify.pg.query(query, values);

  return { recommendation_text: recommendationText.trim(), recommendation_type: 'system_optimization' };
};
