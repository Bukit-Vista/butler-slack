const middleware = require('../middleware');
const controller = require('../controller');
const coda = require('../api/coda');
const actions = require('../controller/actions');

module.exports = {
    actionRouter: async (payload) => {
        payload.logger.info('actionRouter', payload.payload.action_id)

        // Switch on action_id
        const action_id = payload.payload.action_id.split(':')[0];
        const action_id_type = payload.payload.action_id.split(':')[1];
        switch (action_id) {
            case 'reply_message':
                actions.replyMessage(payload);
                break;
            case 'ignore_message':
                actions.ignoreMessage(payload);
                break;
            case 'chat.postMessage':
                actions.ignoreMessage(payload);
                break;
            case 'chat.postEphemeral':
                actions.ignoreMessage(payload);
                break;
            case 'views.open':
                const loading_modal = await controller.actions.loadingModal(payload);

                // Switch on action_id_type
                switch (action_id_type) {
                    case 'inspection_details':
                        await controller.views.showInspectionDetails(payload, loading_modal);
                        break;
                    case 'add_knowledge':

                        break;
                    default:
                        break;
                }

                break;
            case 'views.update':
                actions.ignoreMessage(payload);
                break;
            default:
                break;
        }

    }
}