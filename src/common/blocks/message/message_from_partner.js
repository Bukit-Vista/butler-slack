module.exports = {
    messageFromPartner: (context) => {
        // Dev
        const baseURL = process.env.BIGRR_FE_URL;

        // Prod
        // const baseURL = "https://bigrr.bukitvista.com/"

        const details = `${baseURL}guest-checkin-list/${context.reqBody.booking.id}/booking-details`;

        const blocks = [
            {
                type: "section",
                block_id: context.reqBody.booking.id,
                text: {
                    type: "mrkdwn",
                    text: `_New Message From Booking ID: *${context.reqBody.booking.id}*_\n<${details}|Booking Details>`,
                },
            },
            {
                type: "divider",
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `*${context.reqBody.user.name}*\n${context.reqBody.comment.text}`,
                },
            },
            {
                type: "divider",
            },
            {
                type: "actions",
                block_id: "message_action",
                elements: [
                    {
                        type: "button",
                        text: {
                            type: "plain_text",
                            text: "Reply",
                            emoji: true,
                        },
                        value: "reply_message",
                        action_id: "reply_message",
                    },
                    {
                        type: "button",
                        text: {
                            type: "plain_text",
                            text: "Ignore",
                            emoji: true,
                        },
                        value: "ignore_message",
                        action_id: "ignore_message",
                    },
                ],
            },
        ];

        if (context.reqBody.comment.image_url.length != 0) {
            blocks[2].text.text += `\n\n<${context.reqBody.comment.image_url}|Attachment>`;

            blocks[2].accessory = {
                type: "image",
                image_url: `${context.reqBody.comment.image_url}`,
                alt_text: "conversation image",
            };
        }

        return blocks;
    },
};
