module.exports = {
    createNewTag: async function (payload) {
        const newTopic = payload.body.newTopic;
        payload.logger.info('createNewTag', newTopic.tag)

        await payload.say({
            thread_ts: payload.body.event.ts,
            text: "You've asked question about " + newTopic.tag + " that haven't been asked before. Go explorer!",
            blocks: [
                {
                    "type": "section",
                    "block_id": "osai_answer",
                    "text": {
                        "type": "mrkdwn",
                        "text": `You've asked question about ${newTopic.tag} that haven't been asked before. Go explorer!`
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "mrkdwn",
                            "text": "Would you like to add this question to knowledge base?"
                        }
                    ]
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
                            "value": `${newTopic.tag}/${payload.body.event.text}`,
                            "action_id": "show_modal:insert_answer"
                        }
                    ]
                }
            ]
        })
    }
}
