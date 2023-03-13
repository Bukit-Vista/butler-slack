const n8n = require("../../api/n8n");
const trello = require("../../api/trello");
const middleware = require("../../middleware");

module.exports = {
    getPartnershipKnowledge: async function (payload) {
        payload.logger.info("getPartnershipKnowledge", 'start')

        const topic = payload.body.topic;
        payload.logger.info("getPartnershipKnowledge", 'controller')
        try {
            const response = await n8n.getPartnershipKnowledge(payload.body);
            if (response) {
                return {
                    text: response.answer,
                    link: response.link
                }
            } else {
                return {
                    text: `Error ${response.code}`,
                    link: ""
                }
            }
        } catch (error) {
            console.error(error);
            return {
                text: `Error: ${error}`,
                link: ""
            }
        }
    }
}
