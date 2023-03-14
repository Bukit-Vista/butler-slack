const { object, string } = require('yup');

module.exports = {
    sendToChannel: async function (payload, text, context) {
        payload.logger.info('sendToChannel')

        const private_metadata = JSON.parse(payload.view.private_metadata);

        let data = {
            channel: private_metadata.channel,
            text: "Successfully submitted!",
            blocks: [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": text
                    }
                },
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "mrkdwn",
                            "text": context
                        }
                    ]
                }
            ]
        }

        await payload.client.chat.postMessage(data)

    }
}
