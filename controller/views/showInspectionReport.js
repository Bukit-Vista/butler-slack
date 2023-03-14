const coda = require('../../api/coda');
const modal = require('../../view/modal');

module.exports = {
    showInspectionReport: async (payload) => {
        payload.logger.info("showInspectionReport", payload.action.action_id, payload.action.value);

        try {
            const result = await payload.client.views.update({
                view_id: payload.body.view.id,
                hash: payload.body.view.hash,
                view: await modal.inspectionReport(payload)
            });

            return result;
        }
        catch (error) {
            payload.logger.error(error);
        }
    }
}