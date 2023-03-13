const { query } = require('./config');

module.exports = {
    getTopics: async () => {
        console.log('[Database]', 'getTopics')
        const topics = await query(`SELECT 
        kbt.id,
        kbt.tag,
        kbt.knowledge_source,
        ks.name as knowledge_source_name,
        kot.object as object_type
        FROM knowledge_base_tags kbt
        JOIN knowledge_sources ks ON ks.id = kbt.knowledge_source
        JOIN knowledge_object_types kot ON kot.id = ks.object_type;`);

        return topics;
    }
}