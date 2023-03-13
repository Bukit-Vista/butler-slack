const middleware = require('../middleware');
const controller = require('../controller');
const coda = require('../api/coda');
const actions = require('../controller/actions');

module.exports = {
    viewSubmissionRouter: async (payload) => {

        // Acknowledge
        // await payload.ack();

        const values = payload.view.state.values;

        console.log('values');
        console.dir(values, { depth: null });

        // Switch on view title
        const view_title = payload.view.title.text;

        payload.logger.info('viewSubmissionRouter', view_title)

        switch (view_title) {
            case 'Add knowledge':
                // actions.replyMessage(payload);
                break;
            default:
                break;
        }

    }
}