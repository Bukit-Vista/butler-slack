const { query } = require('./config');

module.exports = {
    getKnowledgeSources: async () => {
        console.log('[Database]', 'getKnowledgeSources')
        const knowledge_sources = await query(`SELECT 
        * 
        FROM knowledge_sources;`);


        console.log('[Database]', 'getKnowledgeSources', knowledge_sources.length)

        return knowledge_sources;
    }
}