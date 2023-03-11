const { messageFromPartner } = require('./messageFromPartner');
const { createNewTag } = require('./createNewTag');
const { errorMessage } = require('./errorMessage');

const message = {
    messageFromPartner,
    createNewTag,
    errorMessage
}

module.exports = message;