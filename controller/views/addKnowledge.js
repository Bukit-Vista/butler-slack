const coda = require('../../api/coda');
const modal = require('../../view/modal');

module.exports = {
    addKnowledge: async (payload, loading_modal) => {
        const data = JSON.parse(payload.body.actions[0].value);
        payload.logger.info("addKnowledge", data);

        try {
            const result = await payload.client.views.update({
                view_id: loading_modal.view.id,
                view: modal.addKnowledge(data)
            });

            return result;
        }
        catch (error) {
            payload.logger.error(error);
        }
    }
}