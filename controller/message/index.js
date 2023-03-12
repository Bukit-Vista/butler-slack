const { messageFromPartner } = require('./messageFromPartner');
const { createNewTag } = require('./createNewTag');
const { errorMessage } = require('./errorMessage');
const { sendReply } = require('./sendReply');
const { testMessage } = require('./testMessage');

const message = {
    messageFromPartner,
    createNewTag,
    errorMessage,
    sendReply,
    testMessage
}

module.exports = message;