const env = require("./../../env");
const api = require("./../../api");
const payloads = require("./../../payloads");

async function createMessage(reqBody) {
    console.log(reqBody);
    if (reqBody.user?.type !== "partner") {
        return;
    }

    const payloadAPI = payloads.newMessage({
        channelID: env.dispatchChannelID,
        reqBody,
    });

    let slackRes = await api.callAPIMethod("chat.postMessage", payloadAPI);

    if (!slackRes.ok) {
        console.log(slackRes);
        return;
    }
}

module.exports = { createMessage };
