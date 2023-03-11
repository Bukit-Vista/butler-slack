const middleware = require('../middleware');
const controller = require('../controller');
const coda = require('../api/coda');

module.exports = {
    topicRouter: async (payload) => {

        const topic = payload.body.topic;

        // If topic is not undefined
        if (topic) {
            payload.logger.info('topicRouter', topic.tag, topic.knowledge_source);

            // Switch on the action type
            switch (topic.knowledge_source) {
                case 'airbnb-listing':
                    // Extract object from message and attach to payload
                    const object = await middleware.extractObject(payload);
                    payload.body.object = object;

                    // Get knowledge from database
                    controller.events.getKnowledge(payload);
                    break;
                case 'trello-partnership':
                    controller.events.getPartnershipKnowledge(payload);
                    break;
                case 'coda-har-guideline':
                    controller.events.getHarGeneralKnowledge(payload);
                    break;
                case 'unknown':
                    break;
                default:
                    break;
            }
        } else {

            // Offer user to create new topic
            await controller.message.createNewTag(payload);

        }

    }
}