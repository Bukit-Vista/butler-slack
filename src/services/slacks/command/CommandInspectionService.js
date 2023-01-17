const { MakePropertyApiService } = require("@service/make/MakePropertyService");
const { decorate, injectable, inject } = require("inversify");
const { Modal, Blocks } = require("slack-block-builder");
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
        // const properties = await this.makePropertyApiService.getProperties();

        return Modal({
            callbackId: "inspection_modal",
            title: "Submit Inspection",
            submit: "Submit",
        })
            .blocks(
                Blocks.Input({
                    blockId: "title_block",
                    label: "Title",
                    hint: "Input title",
                }),
                Blocks.Input({
                    blockId: "description_block",
                    label: "Description",
                    hint: "Input title",
                }),
            )
            .buildToJSON();
        // return {
        //     trigger_id: values.trigger.id,
        //     view: JSON.stringify({
        //         type: "modal",
        //         title: {
        //             type: "plain_text",
        //             text: "Submit a helpdesk ticket",
        //         },
        //         callback_id: "submit-ticket",
        //         submit: {
        //             type: "plain_text",
        //             text: "Submit",
        //         },
        //         blocks: [
        //             {
        //                 block_id: "urgency_block",
        //                 type: "input",
        //                 label: {
        //                     type: "plain_text",
        //                     text: "Property",
        //                 },
        //                 element: {
        //                     action_id: "urgency",
        //                     type: "static_select",
        //                     options: properties.map((property) => ({
        //                         text: {
        //                             type: "plain_text",
        //                             text: property["property"],
        //                         },
        //                         value: property["rowId"],
        //                     })),
        //                 },
        //                 optional: true,
        //             },
        //             {
        //                 block_id: "title_block",
        //                 type: "input",
        //                 label: {
        //                     type: "plain_text",
        //                     text: "Title",
        //                 },
        //                 element: {
        //                     action_id: "title",
        //                     type: "plain_text_input",
        //                 },
        //                 hint: {
        //                     type: "plain_text",
        //                     text: "30 second summary of the problem",
        //                 },
        //             },
        //             {
        //                 block_id: "description_block",
        //                 type: "input",
        //                 label: {
        //                     type: "plain_text",
        //                     text: "Description",
        //                 },
        //                 element: {
        //                     action_id: "description",
        //                     type: "plain_text_input",
        //                     multiline: true,
        //                 },
        //                 optional: true,
        //             },
        //         ],
        //     }),
        // };
    }
}

decorate(injectable(), CommandInspectionService);
decorate(inject(MakePropertyApiService.name), CommandInspectionService, 0);

module.exports = { CommandInspectionService };
