export const saveScanResult = async (fastify, scanData) => {
    const query = `
        INSERT INTO scan_results 
        (device_id, platform, scan_result, junk_files_count, privacy_traces_count, invalid_shortcuts_count, antivirus_protection_status, firewall_status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id;
    `;
    const values = [
        scanData.device_id,
        scanData.platform,
        scanData.scan_result,
        scanData.junk_files_count,
        scanData.privacy_traces_count,
        scanData.invalid_shortcuts_count,
        scanData.registry_entries_count,
        scanData.registry_fragments_count,
        scanData.internet_improvements_count,
        scanData.disk_optimizations_count,
        scanData.antivirus_protection_status,
        scanData.firewall_status,
        scanData.outdated_drivers_count,
        scanData.outdated_software_count,
        scanData.spyware_threats_count,
        scanData.system_weaknesses_count,
        scanData.system_optimization_status,
        scanData.security_repair_status,
        scanData.system_clean_status
    ];

    const result = await fastify.pg.query(query, values); // Thực hiện truy vấn lưu kết quả
    return result.rows[0].id; // Trả về ID của kết quả quét
};

export const getScanHistory = async (fastify) => {
  const query = 'SELECT * FROM scan_results ORDER BY created_at DESC';
  const result = await fastify.pg.query(query);
  return result.rows; // Trả về tất cả lịch sử quét
};
