const { SlackCommandService } = require("../base/SlackCommandService");

class CommandInspectionService extends SlackCommandService {
    /**
     * @typedef  {object} ITriggerInfo
     * @property {string} id
     *
     * @typedef  {object}       IInspectionPayload
     * @property {ITriggerInfo} trigger
     *
     * @param {IInspectionPayload} values
     * @returns
     */
    payload(values) {
        return {
            trigger_id: values.trigger.id,
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
    }
}

module.exports = { CommandInspectionService };
