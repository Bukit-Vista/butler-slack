const { messageFromPartner } = require('./messageFromPartner');
const { createNewTag } = require('./createNewTag');
const { errorMessage } = require('./errorMessage');
const { sendReply } = require('./sendReply');

const message = {
    messageFromPartner,
    createNewTag,
    errorMessage,
    sendReply
}

module.exports = message;