const { submit, close } = require('./modalActions');
const { title } = require('./modalTitle');
const { inspectionDetails, problemSolving, generalInspection } = require('./inspectionDetails');
const { addKnowledge } = require('./addKnowledge');

const modalBuilder = {
    submit,
    close,
    title,
    inspectionDetails,
    problemSolving,
    generalInspection,
    addKnowledge
}

module.exports = modalBuilder;