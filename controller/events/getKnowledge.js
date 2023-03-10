const flask = require("../../api/flask");

module.exports = {
    getKnowledge: async function (payload) {
        payload.logger.info("getKnowledge", 'controller')
        try {
            const response = await flask.questionAnswer(payload.body);

            if (!response.error) {
                const data = response.data[0];

                if (data.knowledge_found) {
                    await payload.say({
                        thread_ts: payload.body.event.ts,
                        text: data.answer,
                        blocks: [
                            {
                                "type": "section",
                                "text": {
                                    "type": "mrkdwn",
                                    "text": data.answer
                                }
                            },
                            {
                                "type": "context",
                                "elements": [
                                    {
                                        "type": "mrkdwn",
                                        "text": "`" + data.tag + "` " + `${data.knowledge_source}`
                                    }
                                ]
                            }
                        ]
                    })
                }
            } else {
                await payload.say({
                    thread_ts: payload.body.event.ts,
                    text: `:warning: ${response.msg}`
                })
            }

        } catch (error) {
            console.error(error);
        }
    }
}
