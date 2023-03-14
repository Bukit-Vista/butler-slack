const coda = require('../../api/coda');
const modal = require('../../view/modal');

module.exports = {
    showInspectionDetails: async (payload, loading_modal) => {
        payload.logger.info("showInspectionDetails", payload.body.actions[0].value);

        // Get the details from Coda row
        payload.body.inspection_details = await coda.getRow(process.env.CODA_GUEST_DOC_ID, process.env.CODA_GUEST_QC_TABLE_ID, payload.body.actions[0].value);

        try {
            const result = await payload.client.views.update({
                view_id: loading_modal.view.id,
                hash: loading_modal.view.hash,
                view: await modal.inspectionDetails(payload)
            });

            return result;
        }
        catch (error) {
            payload.logger.error(error);
        }
    }
}