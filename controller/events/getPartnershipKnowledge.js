const n8n = require("../../api/n8n");

module.exports = {
    getPartnershipKnowledge: async function (payload) {
        payload.logger.info("getPartnershipKnowledge", 'controller')
        try {
            const response = await n8n.getPartnershipKnowledge(payload.body);
            await payload.say({
                thread_ts: payload.body.event.ts,
                text: response.answer,
                blocks: [
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": response.answer
                        }
                    },
                    {
                        "type": "context",
                        "elements": [
                            {
                                "type": "mrkdwn",
                                "text": "`" + response.topic + "` " + `<${response.source}|${response.property}>`
                            }
                        ]
                    }
                ]
            })
        } catch (error) {
            console.error(error);
        }
    }
}
