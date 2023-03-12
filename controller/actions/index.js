const { replyMessage } = require('./replyMessage');
const { ignoreMessage } = require('./ignoreMessage');
const { loadingModal } = require('./loadingModal');

const actions = {
    replyMessage,
    ignoreMessage,
    loadingModal
}

module.exports = actions;