const api = require("./../../api");
const env = require("./../../env")
const { conversationModal, updatedConversationModal } = require("./../../utils/modal/conversation_modal")
const payloads = require("./../../payloads")

function blockActions(payload) {
  switch (payload.actions[0].action_id) {
    case "reply_message":
      replyMessage(payload)
      break
    case "replied_message":
      repliedMessage(payload)
      break
    case "hide_message":
      hideMessage(payload)
      break
    case "ignore_message":
      ignoreMessage(payload)
      break
  }
}

async function replyMessage(payload) {
  try {
    // For testing purpose
    // const bookingID = "HMQ4N94XFK"

    // For live purpose
    const bookingID = payload.message.blocks[0].block_id

    const slackUserInfo = await api.callAPIMethod('users.info', {
      user: payload.user.id
    })

    const userEmail = slackUserInfo.user.profile.email

    const [bookingDetails, pastConversation] = await Promise.all([
        api.callBVGoAPI(`v1/bookings/${bookingID}`, userEmail), 
        api.callBVGoAPI(`v1/bookings/${bookingID}/notes`, userEmail)
      ])


    const slackRes = await api.callAPIMethod('views.open', {
      trigger_id: payload.trigger_id,
      view: conversationModal({
        private_metadata: JSON.stringify({
          message_ts: payload.message.ts,
          booking_id: bookingID,
          user_email: userEmail
        }),
        pastConversation: pastConversation.data,
        bookingDetails: bookingDetails.data,
      }),
    })

    if (!slackRes.ok) {
      console.log(slackRes)
      console.log('failed to post message')
    }
  } catch (err) {
    console.log(err)
  }
}

async function repliedMessage(payload) {
  const slackRes = await api.callAPIMethod('views.open', {
    trigger_id: payload.trigger_id,
    view: updatedConversationModal(),
  })

  if (!slackRes.ok) {
    console.log(slackRes)
    console.log('failed to post message')
  }
}

async function hideMessage(payload) {
  const statusValue = payload.message.blocks[payload.message.blocks.length - 1].elements[0].value

  const bookingID = payload.message.blocks[0].block_id

  let status
  if (statusValue === "reply_message") {
    status = "replied"
  } else {
    status = "ignored"
  }

  const slackRes = await
    api.callAPIMethod('chat.update', {
      channel: "C04MW37RD5G",
      ts: payload.message.ts,
      blocks: payloads.hideMessage({
        status,
        bookingID
      }),
    })

  if (!slackRes.ok) {
    console.log(slackRes)
    console.log('failed to post message')
  }
}

async function ignoreMessage(payload) {
  const messageTs = payload.message.ts

  const res = await api.callGetAPIMethod("conversations.history", {
    channel: env.dispatchChannelID,
    latest: messageTs,
    limit: 2,
    inclusive: true
  })

  let message
  for (let i = 0; i < res.messages.length - 1; i++) {
    if (res.messages[i].bot_id && res.messages[i].text === "This content can't be displayed.") {
      message = res.messages[i]
      break
    }
  }

  message.blocks.map(block => {
    if (block.block_id === "message_action") {
      block.elements.splice(0, 1)

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

module.exports = {
  blockActions
}