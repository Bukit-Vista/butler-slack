const controller = require('../controller');

module.exports = {
    topicRouter: async (payload) => {

        const topic = payload.body.topic;

        // Switch on the action type
        switch (topic.knowledge_source) {
            case 'trello-partnership':
                payload.logger.info('topicRouter', topic.tag, topic.knowledge_source);
                controller.events.getPartnershipKnowledge(payload);
                break;
            case 'coda-har-guideline':
                payload.logger.info('topicRouter', topic.tag, topic.knowledge_source);
                controller.events.getPartnershipKnowledge(body);
                break;
            default:
                payload.logger.info('topicRouter', topic.tag, topic.knowledge_source);
                break;
        }

    }
}