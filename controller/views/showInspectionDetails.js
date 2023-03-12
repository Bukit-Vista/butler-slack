const coda = require('../../api/coda');
const modal = require('../../view/modal');

module.exports = {
    showInspectionDetails: async (payload, loading_modal) => {
        payload.logger.info("showInspectionDetails", payload.body.actions[0].value);

        // Get the details from Coda row
        const inspection_details = await coda.getRow(process.env.CODA_GUEST_DOC_ID, process.env.CODA_GUEST_QC_TABLE_ID, payload.body.actions[0].value);

        // Use different views for different inspection types
        let inspection_type = inspection_details.values['c-xHnkL0iqu4'].toLowerCase();
        let inspection_view = null;
        if (inspection_type.includes('pre-check ins')) {
            inspection_view = modal.inspectionDetails(inspection_details);
        } else if (inspection_type.includes('problem solving')) {
            inspection_view = modal.problemSolving();
        } else if (inspection_type.includes('general inspection')) {
            inspection_view = modal.generalInspection();
        } else {
            // Do nothing
        }

        // try {
        //     const result = await payload.client.views.update({
        //         view_id: payload.body.view.id,
        //         view: {
        //             "type": "modal",
        //             "private_metadata": "",
        //             "title": {
        //                 "type": "plain_text",
        //                 "text": payload.body.actions[0].text.text,
        //                 "emoji": true
        //             },
        //             "close": {
        //                 "type": "plain_text",
        //                 "text": "Cancel",
        //                 "emoji": true
        //             },
        //             "blocks": [
        //                 {
        //                     "type": "section",
        //                     "block_id": `loading:${payload.body.actions[0].action_id}`,
        //                     "text": {
        //                         "type": "mrkdwn",
        //                         "text": ":loading: Please wait..."
        //                     }
        //                 }
        //             ]
        //         }
        //     });

        //     return result;
        // }
        // catch (error) {
        //     payload.logger.error(error);
        // }
    }
}