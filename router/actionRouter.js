const controller = require('../controller');

module.exports = {
    actionRouter: async (payload) => {
        payload.logger.info('actionRouter', payload.action.type, payload.action.action_id)

        // Acknowledge
        await payload.ack();

        // Switch on action type
        switch (payload.action.type) {
            case 'button':
                // Switch on action_id
                const action_id = payload.payload.action_id.split(':')[0];
                const action_id_type = payload.payload.action_id.split(':')[1];
                switch (action_id) {
                    case 'reply_message':
                        controller.actions.replyMessage(payload);
                        break;
                    case 'ignore_message':
                        controller.actions.ignoreMessage(payload);
                        break;
                    case 'chat.postMessage':
                        controller.actions.ignoreMessage(payload);
                        break;
                    case 'chat.postEphemeral':
                        controller.actions.ignoreMessage(payload);
                        break;
                    case 'views.open':
                        const loading_modal = await controller.actions.loadingModal(payload);

                        // Switch on action_id_type
                        switch (action_id_type) {
                            case 'inspection_details':
                                await controller.views.showInspectionDetails(payload, loading_modal);
                                break;
                            case 'add_knowledge':
                                await controller.views.addKnowledge(payload, loading_modal);
                                break;
                            default:
                                break;
                        }

                        break;
                    case 'views.update':
                        controller.views.showInspectionReport(payload);
                        break;
                    default:
                        break;
                }
                break;
            case 'block_actions':
                break;
            default:
                break;
        }
    }
}