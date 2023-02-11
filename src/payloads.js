module.exports = {
    confirmation: (context) => {
        return {
            channel: context.channel_id,
            text: "Helpdesk ticket created!",
            blocks: JSON.stringify([
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: "*Helpdesk ticket created!*",
                    },
                },
                {
                    type: "divider",
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: `*Title*\n${context.title}\n\n*Description*\n${context.description}`,
                    },
                },
                {
                    type: "context",
                    elements: [
                        {
                            type: "mrkdwn",
                            text: `*Urgency*: ${context.urgency}`,
                        },
                    ],
                },
            ]),
        };
    },
    modal: (context) => {
        return {
            trigger_id: context.trigger_id,
            view: JSON.stringify({
                type: "modal",
                title: {
                    type: "plain_text",
                    text: "Submit a helpdesk ticket",
                },
                callback_id: "submit-ticket",
                submit: {
                    type: "plain_text",
                    text: "Submit",
                },
                blocks: [
                    {
                        block_id: "title_block",
                        type: "input",
                        label: {
                            type: "plain_text",
                            text: "Title",
                        },
                        element: {
                            action_id: "title",
                            type: "plain_text_input",
                        },
                        hint: {
                            type: "plain_text",
                            text: "30 second summary of the problem",
                        },
                    },
                    {
                        block_id: "description_block",
                        type: "input",
                        label: {
                            type: "plain_text",
                            text: "Description",
                        },
                        element: {
                            action_id: "description",
                            type: "plain_text_input",
                            multiline: true,
                        },
                        optional: true,
                    },
                    {
                        block_id: "urgency_block",
                        type: "input",
                        label: {
                            type: "plain_text",
                            text: "Importance",
                        },
                        element: {
                            action_id: "urgency",
                            type: "static_select",
                            options: [
                                {
                                    text: {
                                        type: "plain_text",
                                        text: "High",
                                    },
                                    value: "high",
                                },
                                {
                                    text: {
                                        type: "plain_text",
                                        text: "Medium",
                                    },
                                    value: "medium",
                                },
                                {
                                    text: {
                                        type: "plain_text",
                                        text: "Low",
                                    },
                                    value: "low",
                                },
                            ],
                        },
                        optional: true,
                    },
                ],
            }),
        };
    },
    newMessage: (context) => {
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

        return {
            channel: context.channelID,
            text: context.reqBody.comment.text,
            blocks: JSON.stringify(blocks),
        };
    },
    hideMessage: (context) => {
        return JSON.stringify([
            {
                type: "section",
                block_id: "bR3J",
                text: {
                    type: "mrkdwn",
                    text: `_Message from booking id *${context.bookingID}* was *${context.status} and hide*_`,
                },
            },
        ]);
    },
};
