const { MakePropertyApiService } = require("@service/make/MakePropertyService");
const { decorate, injectable, inject } = require("inversify");
const { SlackCommandService } = require("../base/SlackCommandService");

class CommandInspectionService extends SlackCommandService {
    /** @private */
    makePropertyApiService;

    /**
     * @param {MakePropertyApiService} makePropertyApiService
     */
    constructor(makePropertyApiService) {
        super();
        this.makePropertyApiService = makePropertyApiService;
    }

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
    async payload(values) {
        const properties = await this.makePropertyApiService.getProperties();

        return {
            ["trigger_id"]: values.trigger.id,
            view: JSON.stringify({
                title: {
                    type: "plain_text",
                    text: "QC Inspection",
                    emoji: true,
                },
                submit: {
                    type: "plain_text",
                    text: "Submit",
                    emoji: true,
                },
                type: "modal",
                close: {
                    type: "plain_text",
                    text: "Cancel",
                    emoji: true,
                },
                blocks: [
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: ":wave: Hey [Name]!",
                            emoji: true,
                        },
                    },
                    {
                        block_id: "select_property",  
                        type: "section",
                        text: {
                            type: "mrkdwn",
                            text: "Please select property",
                        },
                        accessory: {
                            type: "static_select",
                            placeholder: {
                                type: "plain_text",
                                text: "Select property",
                                emoji: true,
                            },
                            options: properties.map((property) => ({
                                text: {
                                    type: "plain_text",
                                    text: `${property["property"]}`,
                                    emoji: true,
                                },
                                value: property,
                            })),
                            action_id: "static_select-action",
                        },
                    },
                    {
                        type: "divider",
                    },
                    {
                        block_id: "select_status",
                        type: "section",
                        text: {
                            type: "mrkdwn",
                            text: "Set property status",
                        },
                        accessory: {
                            type: "static_select",
                            placeholder: {
                                type: "plain_text",
                                text: "Select status",
                                emoji: true,
                            },
                            options: [
                                {
                                    text: {
                                        type: "plain_text",
                                        text: "High risk",
                                        emoji: true,
                                    },
                                    value: "High risk",
                                },
                                {
                                    text: {
                                        type: "plain_text",
                                        text: "Medium risk",
                                        emoji: true,
                                    },
                                    value: "Medium risk",
                                },
                                {
                                    text: {
                                        type: "plain_text",
                                        text: "Low risk",
                                        emoji: true,
                                    },
                                    value: "Low risk",
                                },
                                {
                                    text: {
                                        type: "plain_text",
                                        text: "No risk",
                                        emoji: true,
                                    },
                                    value: "No risk",
                                },
                            ],
                            action_id: "static_select-action",
                        },
                    },
                    {
                        block_id: "description",
                        type: "input",
                        label: {
                            type: "plain_text",
                            text: "Report description",
                            emoji: true,
                        },
                        element: {
                            type: "plain_text_input",
                            multiline: true,
                            action_id: "description"
                        },
                        optional: false,
                    },
                    {
                      block_id: "channel_select",
                      type: "input",
                      optional: true,
                      label: {
                        "type": "plain_text",
                        "text": "Select a channel to post the result on"
                      },
                      element: {
                        "action_id": "channel_select",
                        "type": "conversations_select",
                        "response_url_enabled": true,
                        "default_to_current_conversation": true
                      }
                    }
                ],
            }),
        };
    }
}

decorate(injectable(), CommandInspectionService);
decorate(inject(MakePropertyApiService.name), CommandInspectionService, 0);

module.exports = { CommandInspectionService };
