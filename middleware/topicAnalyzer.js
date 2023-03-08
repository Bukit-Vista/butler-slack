const openai = require('../api/openai');
const database = require('../api/database');

module.exports = {
    topicAnalyzer: async (payload) => {
        // User's question
        const question = payload.body.event.text;
        payload.logger.info('topicAnalyzer', question);

        // Fetch list of available topics
        const topics = await database.query(`SELECT
        CONCAT(kbt.id, ".",kbt.tag,"(",ks.name,")") as tags
        FROM knowledge_base_tags kbt
        JOIN knowledge_sources ks ON ks.id = kbt.knowledge_source;`);
        // Compose the message
        const guidelines = [
            "You will receive a message from the user which is a question and you need to find the correct topic for this question.",
            "You will reply to the user with a JSON object **and nothing more**",
            "Your response is a JSON object. This object will contain:",
            "'tag' key, which is the topic of the question that you've found.",
            "'id' key which is the ID of the topic.",
            "'source' key which is the source of the topic.",
            "Your response will **always** the tag from the supplied list of topics",
            "If the tag is not in the list of topics, you will reply with id: 0, source: 'unknown', and 'tag' with the new tag name",
            "Your response will **never** contain just a text message, it will always contain a JSON object",
            "The list of topics is:",
            ...topics.map(topic => topic.tags)
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
                    id: '33',
                    knowledge_source: 'trello-partnership'
                })
            },
            {
                role: "user",
                content: question
            }
        ]
        // Send message to chatGPT to get tag and ID
        const topic = await openai.chat(messages);

        // Attach tag and ID to message.topic
        payload.body.topic = JSON.parse(topic);
        await payload.next();
    }
}