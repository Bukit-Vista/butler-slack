const { object, string } = require('yup');

module.exports = {
    sendSuccessSubmitMessage: async function (payload) {
        payload.logger.info('sendSuccessSubmitMessage')

        const context = [
            payload.view.title.text,
            payload.view.state.values.knowledge_source.knowledge_source.selected_option.text.text
        ]

        const private_metadata = JSON.parse(payload.view.private_metadata);

        await payload.client.chat.postMessage({
            channel: private_metadata.channel,
            thread_ts: private_metadata.ts,
            text: "Successfully submitted!",
            blocks: [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Successfully submitted!"
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
