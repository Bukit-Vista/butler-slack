const { title } = require('./modalTitle');
const modalActions = require('./modalActions');

module.exports = {
    inspectionDetails: async (payload) => {
        const inspection_details = payload.body.inspection_details
        console.log('inspectionDetails', inspection_details.id)
        return {
            type: "modal",
            private_metadata: JSON.stringify({
                id: inspection_details.id,
                name: inspection_details.name,
                unit_name: inspection_details.values['c-z7qZNaBo0l'],
                action_type: inspection_details.values['c-3XVXXpuFP1'],
                channel: payload.body.channel.id
            }),
            close: modalActions.close("Close"),
            title: title("Inspection Details"),
            blocks: [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": inspection_details.name
                    }
                },
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "mrkdwn",
                            "text": `:house: ${inspection_details.values['c-z7qZNaBo0l']}`
                        }
                    ]
                },
                {
                    "text": {
                        "text": inspection_details.values['c-xHnkL0iqu4'],
                        "type": "mrkdwn"
                    },
                    "type": "section",
                },
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "fields": [
                        {
                            "type": "mrkdwn",
                            "text": `*GES*\n${inspection_details.values['c-SvWB8zlvKQ']}`
                        },
                        {
                            "type": "mrkdwn",
                            "text": `*Date & time*\n${new Date(inspection_details.values['c-y-UeyX2aPz']).toLocaleString('id-ID')}`
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
                        "text": `*${inspection_details.values['c-_E1s89LOC3']}*\n${inspection_details.values['c-77T9SW1bqF']}`
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `*Inspection Purpose*\n${inspection_details.values['c--Ec9H35dWl']}`
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `<${inspection_details.browserLink}|Open in Coda>`
                    },
                    "accessory": {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Submit report"
                        },
                        "style": "primary",
                        "action_id": `views.update:${inspection_details.values['c-xHnkL0iqu4']}`,
                        "value": inspection_details.id
                    }
                }
            ]
        }
    }
}