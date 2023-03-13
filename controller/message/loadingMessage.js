module.exports = {
    loadingMessage: async function (payload) {
        const topic = payload.body.topic;
        payload.logger.info('loadingMessage', topic)

        const loadingMessage = await payload.say({
            thread_ts: payload.body.event.ts,
            text: `:loading: Searching *${topic.tag}* from ${topic.knowledge_source_name}...`,
            blocks: [
                {
                    "type": "section",
                    "block_id": `loading:${topic.tag}`,
                    "text": {
                        "type": "mrkdwn",
                        "text": `:loading: Searching *${topic.tag}* from *${topic.knowledge_source_name}*...`
                    }
                }
            ]
        })

        return loadingMessage;
    },
    loadingFinishedMessage: async function (payload, loadingMessage) {
        const topic = payload.body.topic;
        payload.logger.info('loadingFinishedMessage', topic)

        const loadingFinishedMessage = await payload.client.chat.update({
            channel: loadingMessage.channel,
            ts: loadingMessage.ts,
            text: `:white_check_mark: Searching *${topic.tag}* from ${topic.knowledge_source_name}.`,
            blocks: [
                {
                    "type": "section",
                    "block_id": `loadingFinished:${topic.tag}`,
                    "text": {
                        "type": "mrkdwn",
                        "text": `:white_check_mark: Searching *${topic.tag}* from *${topic.knowledge_source_name}*.`
                    }
                }
            ]
        })

        return loadingFinishedMessage;
    }
}
