const { MakePropertyApiService } = require("@service/make/MakePropertyService");
const { decorate, injectable, inject } = require("inversify");
const { Modal, Blocks, Elements } = require("slack-block-builder");
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
        return {
            ["trigger_id"]: values.trigger.id,
            view: Modal({
                callbackId: "inspection-modal",
                title: "Submit Inspection",
                submit: "Submit",
            })
                .blocks(
                    Blocks.Input({
                        blockId: "title_block",
                        label: "Title",
                    }).element(
                        Elements.TextInput({
                            actionId: "title",
                        }),
                    ),
                    Blocks.Input({
                        blockId: "description_block",
                        label: "Description",
                        optional: true,
                    }).element(
                        Elements.TextInput({
                            actionId: "description",
                        }),
                    ),
                )
                .buildToJSON(),
        };
    }
}

decorate(injectable(), CommandInspectionService);
decorate(inject(MakePropertyApiService.name), CommandInspectionService, 0);

module.exports = { CommandInspectionService };
