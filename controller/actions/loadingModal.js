const modal = require('../../view/modal');

module.exports = {
    loadingModal: async (payload) => {

        payload.logger.info("loadingModal", payload.body.actions[0].text.text);
        try {
            const result = await payload.client.views.open({
                trigger_id: payload.body.trigger_id,
                view: {
                    "type": "modal",
                    "private_metadata": "",
                    "title": {
                        "type": "plain_text",
                        "text": payload.body.actions[0].text.text,
                        "emoji": true
                    },
                    "close": {
                        "type": "plain_text",
                        "text": "Cancel",
                        "emoji": true
                    },
                    "blocks": [
                        {
                            "type": "section",
                            "block_id": `loading:${payload.body.actions[0].action_id}`,
                            "text": {
                                "type": "mrkdwn",
                                "text": ":loading: Please wait..."
                            }
                        }
                    ]
                }
            });

            payload.logger.info("loadingModal", result.view.id);
            return result;
        }
        catch (error) {
            logger.error(error);
        }
    }
}