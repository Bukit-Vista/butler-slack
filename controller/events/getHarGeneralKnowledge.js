const coda = require('../../api/coda');
const openai = require('../../api/openai');

module.exports = {
    getHarGeneralKnowledge: async function (payload) {
        payload.logger.info("getHarGeneralKnowledge", 'controller')
        try {
            const response = await coda.getHarGeneralKnowledge();

            // Map the response to get only rowId, name, answer, and tags
            const rows = response.items.map(row => {
                return {
                    id: row.id,
                    question: row.values['c-IxPFpUPhE1'],
                    answer: row.values['c-fJjd02C4dL'],
                    tags: row.values['c-bsmkZFw-3i'],
                    browserLink: row.browserLink
                }
            })

            // Compose the message
            const guidelines = [
                "You will receive a message from the user which is a question and you need to find the most similar question from the list provided.",
                "You will reply to the user with a JSON object **and nothing more**",
                "Your response is a JSON object. This object will contain:",
                "'question' key, which is the question that you've found most similar.",
                "'id' key which the ID of the question. Only return the ID from the provided list of questions.",
                "Your response will **always** the item from the supplied list of questions",
                "If the question is not in the list of questions, you will reply with id: 0, and 'question' with the original user question",
                "Your response will **never** contain just a text message, it will always contain a JSON object",
                "The list of questions is:",
                ...rows.map(row => `id: ${row.id}, question: ${row.question}`)
            ]
            const messages = [
                {
                    role: "system",
                    content: guidelines.join("\n")
                },
                {
                    role: "user",
                    content: "How to order a chef? <@U04MFEQ4MK9>"
                },
                {
                    role: "assistant",
                    content: JSON.stringify({
                        question: 'What should I do If guest request a chef?',
                        id: 'i-hN9tnPNIMu',
                    })
                },
                {
                    role: "user",
                    content: "How to request a working desk? <@U04MFEQ4MK9>"
                },
                {
                    role: "assistant",
                    content: JSON.stringify({
                        question: 'How to request a working desk?',
                        id: '0',
                    })
                },
                {
                    role: "user",
                    content: payload.body.event.text
                }
            ]

            // Match title with question using openAI
            const result = await openai.chat(messages);
            const match = JSON.parse(result);
            const rowMatch = rows.find(row => row.id === match.id);

            // Componse more explanatory answer using openAI
            const answer = await openai.betterAnswer(payload.body.event.text, rowMatch.answer);


            // Send response to user
            await payload.say({
                thread_ts: payload.body.event.ts,
                text: answer,
                blocks: [
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": answer
                        }
                    },
                    {
                        "type": "context",
                        "elements": [
                            {
                                "type": "mrkdwn",
                                "text": "`" + payload.body.topic.tag + "` " + `<${rowMatch.browserLink}|${payload.body.topic.knowledge_source}>`
                            }
                        ]
                    }
                ]
            })
        } catch (error) {
            console.error(error);
        }
    }
}
