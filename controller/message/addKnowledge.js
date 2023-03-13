module.exports = {
    addKnowledge: async function (payload) {
        const answer = payload.body.answer;
        answer.question = payload.body.topic.question;
        payload.logger.info('addKnowledge', answer.tag)

        await payload.say({
            thread_ts: payload.body.event.ts,
            text: `Would you like to add information about *${answer.tag}* to *${answer.knowledge_source}* for *${answer.object_name}*?`,
            blocks: [
                {
                    "type": "section",
                    "block_id": "osai_answer",
                    "text": {
                        "type": "mrkdwn",
                        "text": `Would you like to add information about *${answer.tag}* to *${answer.knowledge_source}* for *${answer.object_name}*?`
                    }
                },
                {
                    "type": "actions",
                    "block_id": "knowledge_block",
                    "elements": [
                        {
                            "type": "button",
                            "style": "danger",
                            "text": {
                                "type": "plain_text",
                                "text": "Add to knowledge base",
                                "emoji": true
                            },
                            "value": JSON.stringify(answer),
                            "action_id": "views.open:add_knowledge"
                        }
                    ]
                }
            ]
        })
    }
}
