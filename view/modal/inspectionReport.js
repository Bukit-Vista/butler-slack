const { title } = require('./modalTitle');
const modalActions = require('./modalActions');

const coda = require('../../api/coda');

module.exports = {
    inspectionReport: async (payload) => {
        payload.logger.info('inspectionReport')

        // Get private_metadata
        const private_metadata = JSON.parse(payload.body.view.private_metadata);

        // Get list of columns from Coda
        const columns = await coda.getColumns(process.env.CODA_GUEST_DOC_ID, process.env.CODA_GUEST_QC_TABLE_ID);

        const list = {};
        list.pre_check_in = ['c-yhY3iPKiwM', 'c-QvrcUm2Rxm', 'c-6pm98rc_B1', 'c-M3oHSPIC6p', 'c-D0posFluuD', 'c-EOjM-pFq96', 'c-5zm5WQ5Bq0', 'c--gfFItGTxG', 'c-gQ_l7NnwPQ', 'c-mZQCeuh17p', 'c-y9gDcMpetf']; // List of column Ids
        list.general_inspection = ['c-0s-f-j6kPc', 'c-xVhUwYTyzT', 'c-fouk61SgZ4', 'c-LQpMmGQIml', 'c-sX3C-QUQlH', 'c-zVk4l__7rq'];
        const included_columns = list[private_metadata.action_type]

        // Map the checklist
        let checklist = await columns.map(column => {
            // Check if column ID is included in the list
            if (included_columns.includes(column['id'])) {
                return {
                    "type": "static_select",
                    "placeholder": {
                        "type": "plain_text",
                        "text": column.name,
                        "emoji": true
                    },
                    "action_id": column.name,
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "🤷 Unchecked",
                                "emoji": true
                            },
                            "value": "❓"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "👍 OK",
                                "emoji": true
                            },
                            "value": "👍"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "👎 Not OK",
                                "emoji": true
                            },
                            "value": "👎🏾"
                        }
                    ]
                }
            }
        });

        // Remove undefined
        checklist = await checklist.filter(function (el) {
            return typeof el !== 'undefined';
        });

        // Check if have check list
        let checklist_section = {};
        if (checklist.length > 0) {
            checklist_section = {
                "type": "actions",
                "block_id": "checklist",
                "elements": await Promise.all(checklist)
            }
        } else {
            checklist_section = {
                "type": "divider"
            }
        }


        return {
            type: "modal",
            private_metadata: JSON.stringify(private_metadata),
            close: modalActions.close("Close"),
            title: title("Inspection Report"),
            submit: modalActions.submit("Submit"),
            blocks: [
                {
                    "type": "divider"
                },
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": private_metadata.name,
                        "emoji": true
                    }
                },
                {
                    "block_id": "status_select",
                    "type": "input",
                    "optional": false,
                    "label": {
                        "type": "plain_text",
                        "text": "Overall property status"
                    },
                    "element": {
                        "action_id": "status_select",
                        "type": "static_select",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Select status",
                            "emoji": true
                        },
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "High risk",
                                    "emoji": true
                                },
                                "value": "High Risk"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Medium risk",
                                    "emoji": true
                                },
                                "value": "Medium Risk"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Low risk",
                                    "emoji": true
                                },
                                "value": "Low Risk"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "No risk",
                                    "emoji": true
                                },
                                "value": "No Risk"
                            }
                        ]
                    }
                },
                checklist_section,
                {
                    "type": "input",
                    "block_id": "report_summary",
                    "label": {
                        "type": "plain_text",
                        "text": "Report summary",
                        "emoji": true
                    },
                    "element": {
                        "type": "plain_text_input",
                        "multiline": true,
                        "action_id": "report_summary"
                    },
                    "optional": false
                },
                {
                    "block_id": "channel_select",
                    "type": "input",
                    "optional": false,
                    "label": {
                        "type": "plain_text",
                        "text": "Channel"
                    },
                    "element": {
                        "action_id": "channel_select",
                        "type": "conversations_select",
                        "response_url_enabled": true,
                        "default_to_current_conversation": true
                    }
                },
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "plain_text",
                            "text": private_metadata.id,
                            "emoji": true
                        }
                    ]
                }
            ]
        }
        payload.logger.info('inspectionReport', 'end')
    }
}