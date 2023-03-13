const modal = require('../../view/modal');
const database = require('../../api/database');

module.exports = {
    addKnowledge: async (payload, loading_modal) => {
        const data = JSON.parse(payload.body.actions[0].value);

        // Get knowledge sources from database
        const knowledge_sources = await database.getKnowledgeSources();
        data.knowledge_sources = knowledge_sources;
        payload.logger.info('[Views]', "addKnowledge");

        try {
            const result = await payload.client.views.update({
                view_id: loading_modal.view.id,
                hash: loading_modal.view.hash,
                view: await modal.addKnowledge(data)
            });

            return result;
        }
        catch (error) {
            payload.logger.error(error);
        }
    }
}