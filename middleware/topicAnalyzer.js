const openai = require('../api/openai');
const database = require('../api/database');

module.exports = {
    topicAnalyzer: async (payload) => {
        // User's question, remove the @mention from text
        const question = payload.body.event.text.replace(`<@${payload.context.botUserId}>`, '').trim();

        payload.logger.info('topicAnalyzer', question);

        // Fetch list of available topics
        const topics = await database.getTopics();

        // Compose the message
        const guidelines = [
            "You will receive a message from the user which is a question and you need to find the correct topic for this question.",
            "You will reply to the user with a JSON object **and nothing more**",
            "Your response is a JSON object. This object will contain:",
            "'tag' key, which is the topic of the question that you've found.",
            "'id' key which is and integer as the ID of the topic.",
            "Your response will **always** the tag from the supplied list of topics",
            "If the tag is not in the list of topics, you will reply with id: 0, and 'tag' with the new tag name",
            "If the tag you detected is slightly different from the list of topics, you will reply with id: 0, and 'tag' with the new tag name",
            "Your response will **never** contain just a text message, it will always contain a JSON object",
            "The list of topics is:",
            ...topics.map(topic => `${topic.id}. ${topic.tag}`)
        ]
        const messages = [
            {
                role: "system",
                content: guidelines.join("\n")
            },
            {
                role: "user",
                content: "Who's the owner of Villa Bagus? <@U04MFEQ4MK9>"
            },
            {
                role: "assistant",
                content: JSON.stringify({
                    tag: 'Property owner',
                    id: 33,
                })
            },
            {
                role: "user",
                content: "How to request a working desk? <@U04MFEQ4MK9>"
            },
            {
                role: "assistant",
                content: JSON.stringify({
                    tag: 'working-desk',
                    id: 0,
                })
            },
            {
                role: "user",
                content: question
            }
        ]
        // Send message to chatGPT to get tag and ID
        const topic = await openai.chat(messages);

        // Attach tag and ID to message.topic and handle if JSON is not valid
        if (topic) {
            try {
                const result = JSON.parse(topic);

                // Filter topics based on the returned tag ID
                const filteredTopics = await topics.filter(topic => topic.id === result.id);

                payload.body.topic = filteredTopics[0];
                payload.body.topic.question = question;
                payload.body.newTopic = result;
            } catch (e) {
                payload.body.topic = null
            }
        }
        await payload.next();
    }
}