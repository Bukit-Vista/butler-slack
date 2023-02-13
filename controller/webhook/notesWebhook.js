
module.exports = {
    notesWebhook: (req, app) => {
        console.log(req.url, req.body.action)

        const data = req.body;
        const blocks = [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "_New message received on BV Go_"
                }
            },
            {
                "type": "context",
                "elements": [
                    {
                        "type": "mrkdwn",
                        "text": `:house: ${data.user.type} | 📖 ${data.booking.id} | 🔗 <${process.env.BIGRR_FE_BASE_URL}/guest-checkin-list/${data.booking.id}/messages|BIGRR>`
                    }
                ]
            },
            {
                "type": "divider"
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `*${data.user.name}* • ${data.user.role}\n${data.comment.text}`
                }
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
                            "text": "Reply"
                        },
                        "value": `${data.booking.id}`,
                        "action_id": "reply_message"
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Ignore"
                        },
                        "value": "ignore_message",
                        "action_id": "ignore_message"
                    }
                ]
            }
        ]

        if (data.comment.image_url) {
            blocks.splice(2, 0, {
                "type": "image",
                "title": {
                    "type": "plain_text",
                    "text": "image"
                },
                "image_url": data.comment.image_url,
                "alt_text": "image"
            });
        }

        // console.log(blocks)

        app.client.chat.postMessage({
            channel: process.env.SLACK_CHANNEL_FOR_NOTES,
            text: `*${data.user.name}* • ${data.user.role}\n${data.comment.text}`,
            blocks: blocks
        })

    }
}