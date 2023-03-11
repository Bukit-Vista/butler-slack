const n8n = require("../../api/n8n");

module.exports = {
    getPartnershipKnowledge: async function (payload) {

        const topic = payload.body.topic;
        payload.logger.info("getPartnershipKnowledge", 'controller')
        try {
            const response = await n8n.getPartnershipKnowledge(payload.body);
            if (response) {
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
                                    "text": "`" + topic.tag + "` " + `<${response.source}|${topic.knowledge_source}>`
                                }
                            ]
                        }
                    ]
                })
            } else {
                await payload.say({
                    thread_ts: payload.body.event.ts,
                    text: "Something went wrong.",
                    blocks: [
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": "Something went wrong."
                            }
                        },
                        {
                            "type": "context",
                            "elements": [
                                {
                                    "type": "mrkdwn",
                                    "text": "`" + topic.tag + "` " + "`" + topic.knowledge_source + "` "
                                }
                            ]
                        }
                    ]
                })
            }
        } catch (error) {
            console.error(error);
        }
    }
}
