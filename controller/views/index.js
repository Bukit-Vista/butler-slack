const { submitReplyMessage } = require('./submitReplyMessage');
const { showInspectionDetails } = require('./showInspectionDetails');
const { showInspectionReport } = require('./showInspectionReport');
const { submitInspectionReport } = require('./submitInspectionReport');
const { addKnowledge } = require('./addKnowledge');
const { submitAddKnowledge } = require('./submitAddKnowledge');

const views = {
    submitReplyMessage,
    showInspectionDetails,
    showInspectionReport,
    submitInspectionReport,
    addKnowledge,
    submitAddKnowledge
}

module.exports = views;