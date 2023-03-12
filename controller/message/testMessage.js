module.exports = {
    testMessage: async (payload) => {
        payload.logger.info("testMessage");
        await payload.say({
            text: `Test Message`,
            blocks: [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `*Test message`
                    }
                },
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "mrkdwn",
                            "text": `:house: Hey there`
                        }
                    ]
                },
                {
                    "type": "divider"
                },
                {
                    "type": "actions",
                    "block_id": "message_action",
                    "elements": [
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "Button A"
                            },
                            "value": `i-FIGN25GYkh`,
                            "action_id": "views.open:inspection_details"
                        },
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "Button B"
                            },
                            "value": "ignore_message",
                            "action_id": "ignore_message"
                        }
                    ]
                }
            ]
        });
    }
}