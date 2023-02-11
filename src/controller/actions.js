const { blockActions } = require("./../services/actions/block_actions");
const { viewSubmission } = require("./../services/actions/view_submission");

function actions(req, res) {
    res.status(204).json("");

    const callbackReq = JSON.parse(req.body.payload);

    console.log("action: ", callbackReq.type);
    switch (callbackReq.type) {
        case "block_actions":
            blockActions(callbackReq);
            break;
        case "view_submission":
            viewSubmission(callbackReq);
            break;
    }
}

module.exports = actions;
