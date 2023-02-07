const { createMessage: createMessageService } = require("./../services/events/create_message")

async function events(req, res) {
  const body = req.body;

  switch (body.action) {
    case "notes.insert":
      await createMessageService(body)
      break
  }

  res.send(body.challenge);
}

module.exports = events