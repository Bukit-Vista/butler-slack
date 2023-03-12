const { object, string } = require('yup');

module.exports = {
    sendReply: async function (payload, answer) {
        const topic = payload.body.topic;
        payload.logger.info('sendReply', answer.answer)

        let answerSchema = object({
            answer: string().required(),
            knowledge_source: string().required(),
            object_type: string().required(),
            object_name: string().required(),
            tag: string().required(),
            link: string()
        });

        // parse and assert validity
        const validAnswer = await answerSchema.validate(answer);

        // send reply if valid answer
        if (validAnswer) {
            const context = [
                "`" + answer.tag + "`",
                "`" + answer.object_name + "`",
                (answer.link ? `\n<${answer.link}|${answer.knowledge_source}>` : "\n*" + answer.knowledge_source + "*")
            ]
            await payload.say({
                thread_ts: payload.body.event.ts,
                text: answer.answer,
                blocks: [
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": answer.answer
                        }
                    },
                    {
                        "type": "context",
                        "elements": [
                            {
                                "type": "mrkdwn",
                                "text": context.join(" ")
                            }
                        ]
                    }
                ]
            })
        }
    }
}
