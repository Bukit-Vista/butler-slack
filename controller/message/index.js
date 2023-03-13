const { messageFromPartner } = require('./messageFromPartner');
const { createNewTag } = require('./createNewTag');
const { errorMessage } = require('./errorMessage');
const { sendReply } = require('./sendReply');
const { testMessage } = require('./testMessage');
const { loadingMessage, loadingFinishedMessage } = require('./loadingMessage');
const { addKnowledge } = require('./addKnowledge');
const { sendSuccessSubmitMessage } = require('./sendSuccessSubmitMessage');

const message = {
    messageFromPartner,
    createNewTag,
    errorMessage,
    sendReply,
    testMessage,
    loadingMessage,
    loadingFinishedMessage,
    addKnowledge,
    sendSuccessSubmitMessage
}

module.exports = message;