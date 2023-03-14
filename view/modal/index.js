const { submit, close } = require('./modalActions');
const { title } = require('./modalTitle');
const { inspectionDetails } = require('./inspectionDetails');
const { inspectionReport } = require('./inspectionReport');
const { addKnowledge } = require('./addKnowledge');

const modalBuilder = {
    submit,
    close,
    title,
    inspectionDetails,
    inspectionReport,
    addKnowledge
}

module.exports = modalBuilder;