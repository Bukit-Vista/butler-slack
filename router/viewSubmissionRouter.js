const middleware = require('../middleware');
const controller = require('../controller');
const coda = require('../api/coda');
const actions = require('../controller/actions');
const trello = require('../api/trello');

module.exports = {
    viewSubmissionRouter: async (payload) => {

        // Acknowledge
        await payload.ack();

        const values = payload.view.state.values;

        // Switch on view title
        const view_title = payload.view.title.text;
        payload.logger.info('viewSubmissionRouter', view_title);
        switch (view_title) {
            case 'Add knowledge':

                // Switch on knowledge source
                switch (values.knowledge_source.knowledge_source.selected_option.value) {
                    case '1': // Airbnb listing
                        // Add to Trello
                        const data = {
                            title: `[${values.knowledge_source.knowledge_source.selected_option.text.text}] - Add info about ${values.tag.tag.value} for ${values.object_name.object_name.value}`,
                            description: `**Tag:** ${values.tag.tag.value}\n**Object name:** ${values.object_name.object_name.value}\n**Knowledge:** ${values.answer.answer.value}`,
                            list_id: '5b978343e8643f897f444540', // New request
                            board_id: '5f447a1b202a2b4974bd0e7e' // Content request
                        }
                        payload.body.submissionResult = await trello.addCard(data);
                        break;
                    default:
                        break;
                }
            default:
                break;
        }

        payload.logger.info('viewSubmission', payload.body.submissionResult.success);
        if (payload.body.submissionResult.success) {
            // Send reply message
            console.log('private_metadata', payload.view.private_metadata);
            await controller.message.sendSuccessSubmitMessage(payload);
            console.log('viewSubmission', 'Success');
        } else {
            console.log('viewSubmission', "Error");
        }
    }
}