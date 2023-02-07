function conversationModal(context) {
  const conversations = context.pastConversation.map(conversation => {
    const [date, time] = conversation.created_at.split('T')
    const timeHour = time.slice(0, 5)
    const userType = conversation.user.employee ? "Employee" : "Staff";

    const textConversation = {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `*${conversation.user.name}*\n\n${conversation.text}`
      }
    }

    if (conversation.image_url.length != 0) {
      textConversation.text.text += `\n\n<${conversation.image_url}|Attachment>`

      textConversation.accessory = {
        "type": "image",
        "image_url": `${conversation.image_url}`,
        "alt_text": "conversation image"
      }
    }

    const metaData = [
      {
        "type": "context",
        "elements": [
          {
            "type": "mrkdwn",
            "text": `${date}, ${timeHour}`
          },
          {
            "type": "mrkdwn",
            "text": "|"
          },
          {
            "type": "mrkdwn",
            "text": `*${userType}*`
          }
        ]
      },
      {
        "type": "divider"
      }
    ]

    return [textConversation, ...metaData]
  })

  const blockKit = {
    "title": {
      "type": "plain_text",
      "text": "Conversation",
      "emoji": true
    },
    "submit": {
      "type": "plain_text",
      "text": "Send",
      "emoji": true
    },
    "type": "modal",
    "close": {
      "type": "plain_text",
      "text": "Cancel",
      "emoji": true
    },
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Here's the conversation about *${context.bookingDetails.guest.name}* at *${context.bookingDetails.listing.name}*.`
        }
      },
      {
        "type": "divider"
      },
      /* Replace here, index 2 */
      {
        "type": "input",
        "block_id": "reply_message",
        "element": {
          "type": "plain_text_input",
          "multiline": true,
          "action_id": "plain_text_input-action"
        },
        "label": {
          "type": "plain_text",
          "text": "Reply",
          "emoji": true
        }
      }
    ],
    "private_metadata": context.private_metadata
  }

  let insertAt = 2
  conversations.forEach((each, idx) => {
    blockKit.blocks.splice(insertAt, 0, ...each)
    insertAt += 3
  })

  return JSON.stringify(blockKit)
}

function updatedConversationModal() {
  return JSON.stringify({
    "title": {
      "type": "plain_text",
      "text": "Conversation",
      "emoji": true
    },
    "type": "modal",
    "close": {
      "type": "plain_text",
      "text": "Close",
      "emoji": true
    },
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Here's the conversation about *Guest name* at *property name*."
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*Wayan*\nPrivate walk-in bathroom. TV. Heating. Kitchen with microwave, basic cooking utensils, wine glasses and silverware."
        }
      },
      {
        "type": "context",
        "elements": [
          {
            "type": "mrkdwn",
            "text": "23 Jan 2023, 14:00"
          },
          {
            "type": "mrkdwn",
            "text": "|"
          },
          {
            "type": "mrkdwn",
            "text": "Staff"
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*Ketut*\nStudio home. Modern bathroom. TV. Heating. Full kitchen. Patio with lounge chairs and campfire style fire pit and grill."
        },
        "accessory": {
          "type": "image",
          "image_url": "https://api.slack.com/img/blocks/bkb_template_images/redwoodcabin.png",
          "alt_text": "Redwood Suite"
        }
      },
      {
        "type": "context",
        "elements": [
          {
            "type": "mrkdwn",
            "text": "23 Jan 2023, 14:00"
          },
          {
            "type": "mrkdwn",
            "text": "|"
          },
          {
            "type": "mrkdwn",
            "text": "Employee"
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*Budi*\n*One person only*. Shared modern bathrooms and showers in lounge building. Temperature control with heated blankets. Lights and electrical outlets."
        }
      },
      {
        "type": "context",
        "elements": [
          {
            "type": "mrkdwn",
            "text": "23 Jan 2023, 14:00"
          },
          {
            "type": "mrkdwn",
            "text": "|"
          },
          {
            "type": "mrkdwn",
            "text": "Property owner"
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*Bayu*\nShared modern bathrooms and showers in lounge building. Temperature control with heated blankets. Lights and electrical outlets."
        }
      },
      {
        "type": "context",
        "elements": [
          {
            "type": "mrkdwn",
            "text": "23 Jan 2023, 14:00"
          },
          {
            "type": "mrkdwn",
            "text": "|"
          },
          {
            "type": "mrkdwn",
            "text": "You"
          }
        ]
      }
    ]
  })
}

module.exports = {
  conversationModal,
  updatedConversationModal
}