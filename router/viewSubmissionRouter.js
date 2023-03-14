const controller = require('../controller');

module.exports = {
    viewSubmissionRouter: async (payload) => {

        // Acknowledge
        await payload.ack();

        // Switch on view title
        const view_title = payload.view.title.text;
        payload.logger.info('viewSubmissionRouter', view_title);
        switch (view_title) {
            case 'Add knowledge':
                await controller.views.submitAddKnowledge(payload);
                break;
            case 'Inspection Report':
                await controller.views.submitInspectionReport(payload);
                break;
            default:
                break;
        }


    }
}