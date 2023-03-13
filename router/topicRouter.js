const middleware = require('../middleware');
const controller = require('../controller');
const coda = require('../api/coda');

module.exports = {
    topicRouter: async (payload) => {

        const topic = payload.body.topic;

        // If topic is not undefined
        if (topic) {
            payload.logger.info('topicRouter', topic.tag, topic.knowledge_source_name);

            // Show loading
            const loadingMessage = await controller.message.loadingMessage(payload);

            // Switch on the action type

            switch (topic.knowledge_source_name) {
                case 'airbnb-listing':
                    // Get knowledge from database
                    payload.body.answer = await controller.events.getKnowledge(payload);
                    break;
                case 'trello-partnership':
                    payload.body.answer = await controller.events.getPartnershipKnowledge(payload);
                    break;
                case 'coda-har-guideline':
                    payload.body.answer = await controller.events.getHarGeneralKnowledge(payload);
                    break;
                case 'unknown':
                    break;
                default:
                    break;
            }

            // Stop loading message
            await controller.message.loadingFinishedMessage(payload, loadingMessage);

            // Send reply message
            await controller.message.sendReply(payload);

            // If knowledge not found, send to add knowledge controller
            if (payload.body.answer && !payload.body.answer.knowledge_found) {

                // Offer user to create new topic
                await controller.message.addKnowledge(payload);
            }
        } else {

            // Offer user to create new topic
            await controller.message.createNewTag(payload);

        }

    }
}