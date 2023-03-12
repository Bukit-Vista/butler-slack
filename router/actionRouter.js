const middleware = require('../middleware');
const controller = require('../controller');
const coda = require('../api/coda');
const actions = require('../controller/actions');

module.exports = {
    actionRouter: async (payload) => {
        payload.logger.info('actionRouter', payload.payload.action_id)


        // Switch on action_id
        const action_id = payload.payload.action_id.split(':')[0];
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
                actions.ignoreMessage(payload);
                break;
            case 'views.update':
                actions.ignoreMessage(payload);
                break;
            default:
                break;
        }

    }
}