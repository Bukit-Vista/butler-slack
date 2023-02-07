const api = require("./../../api");
const env = require("./../../env")
const axios = require('axios');
const { updatedConversationModal } = require("./../../utils/modal/conversation_modal")

function viewSubmission(callbackReq) {
  switch (callbackReq.view.title.text) {
    case "Conversation":
      replyMessage(callbackReq);
      break;
  }
}

async function replyMessage(callbackReq) {
  const {
    message_ts: messageTs,
    booking_id: bookingID,
    user_email: userEmail
  } = JSON.parse(callbackReq.view.private_metadata)

  const replyValue = callbackReq.view.state.values.reply_message["plain_text_input-action"].value

  const data = {
    user: {
      id: process.env.BVGO_USER_ID,
      name: process.env.BVGO_USER_NAME
    },
    booking: {
      id: bookingID
    },
    comment: {
      title: `${process.env.BVGO_USER_NAME} commented`,
      type: 1,
      text: replyValue,
      image_url: ""
    }
  }

  const [bvGo, res] = await Promise.all([
    api.postBVGoAPI(`v1/bookings/${bookingID}/notes`, userEmail, {
      data
    }),
    api.callGetAPIMethod("conversations.history", {
      channel: env.dispatchChannelID,
      latest: messageTs,
      limit: 2,
      inclusive: true
    })
  ])

  let message
  for (let i = 0; i < res.messages.length - 1; i++) {
    if (res.messages[i].bot_id && res.messages[i].text === "This content can't be displayed.") {
      message = res.messages[i]
      break
    }
  }

  message.blocks.map(block => {
    if (block.block_id === "message_action") {
      block.elements.pop()

      block.elements[0].action_id = "hide_message"
      block.elements[0].text.text = "Hide Message"
    }
    return block
  })

  const slackRes = await
    api.callAPIMethod('chat.update', {
      channel: env.dispatchChannelID,
      ts: messageTs,
      blocks: JSON.stringify(message.blocks)
    })

  if (!slackRes.ok) {
    console.log(slackRes)
    console.log('failed to post message')
  }
}

module.exports = { viewSubmission }