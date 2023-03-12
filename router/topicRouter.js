const middleware = require('../middleware');
const controller = require('../controller');
const coda = require('../api/coda');

module.exports = {
    topicRouter: async (payload) => {

        const topic = payload.body.topic;

        // If topic is not undefined
        if (topic) {
            payload.logger.info('topicRouter', topic.tag, topic.knowledge_source_name);

            // Switch on the action type

            switch (topic.knowledge_source_name) {
                case 'airbnb-listing':
                    // Get knowledge from database
                    answer = await controller.events.getKnowledge(payload);
                    break;
                case 'trello-partnership':
                    answer = await controller.events.getPartnershipKnowledge(payload);
                    break;
                case 'coda-har-guideline':
                    answer = await controller.events.getHarGeneralKnowledge(payload);
                    break;
                case 'unknown':
                    break;
                default:
                    break;
            }

            // Send reply message
            await controller.message.sendReply(payload, answer);
        } else {

            // Offer user to create new topic
            await controller.message.createNewTag(payload);

        }

    }
}