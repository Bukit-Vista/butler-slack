const { submit, close } = require('./modalActions');
const { title } = require('./modalTitle');
const { inspectionDetails, problemSolving, generalInspection } = require('./inspectionDetails');

const modalBuilder = {
    submit,
    close,
    title,
    inspectionDetails,
    problemSolving,
    generalInspection
}

module.exports = modalBuilder;