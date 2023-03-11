const { object, string } = require('yup');

module.exports = {
    sendReply: async function (payload, answer) {
        const topic = payload.body.topic;
        payload.logger.info('sendReply', answer.text)

        let answerSchema = object({
            text: string().required(),
            link: string()
        });

        // parse and assert validity
        const validAnswer = await answerSchema.validate(answer);

        // send reply if valid answer
        if (validAnswer) {
            await payload.say({
                thread_ts: payload.body.event.ts,
                text: answer.text,
                blocks: [
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": answer.text
                        }
                    },
                    {
                        "type": "context",
                        "elements": [
                            {
                                "type": "mrkdwn",
                                "text": "`" + topic.tag + "` " + `<${answer.link}|${topic.knowledge_source}>`
                            }
                        ]
                    }
                ]
            })
        }
    }
}
