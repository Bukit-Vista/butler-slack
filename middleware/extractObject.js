const openai = require('../api/openai');
const database = require('../api/database');

module.exports = {
    extractObject: async (payload) => {
        // User's question
        const question = payload.body.event.text;

        // Object type
        const object_type = payload.body.topic.object_type;

        // Tag
        const tag_id = payload.body.topic.id;

        payload.logger.info('extractObject', object_type, question);

        // Get list of available objects filtered by tag and object_type
        const objects = await database.query(`SELECT 
        kb.object_id,
        kb.object_name,
        kb.object_type
        FROM knowledge_base kb
        JOIN knowledge_object_types kot ON kot.id = kb.object_type
        WHERE kot.object = "${object_type}" AND kb.tags = ${tag_id};`);

        // Compose the message
        const guidelines = [
            "You will receive a message from the user which is a question and you need to find the correct object for this question.",
            "You will reply to the user with a JSON object **and nothing more**",
            "Your response is a JSON object. This object will contain:",
            "'object_name' key, which is the name of object of the question that you've found.",
            "'object_id' key which is a string of the ID of the object.",
            "Your response will **always** the object from the supplied list of objects",
            "If the tag is not in the list of objects, you will reply with object_id: 0, object_name: 'unknown', and object_id: 'unknown'",
            "Your response will **never** contain just a text message, it will always contain a JSON object",
            "The list of objects is:",
            ...objects.map(object => `${object.object_id}. ${object.object_name}`)
        ]
        const messages = [
            {
                role: "system",
                content: guidelines.join("\n")
            },
            {
                role: "user",
                content: "Does room Kembang Kuning - 02 (downstairs) get sea view? <@U04MFEQ4MK9>"
            },
            {
                role: "assistant",
                content: JSON.stringify({
                    object_id: '206',
                    object_name: 'Kembang Kuning - 02 (downstairs)'
                })
            },
            {
                role: "user",
                content: question
            }
        ]

        // Send message to chatGPT to get tag and ID
        const gpt = await openai.chat(messages);

        // Attach tag and ID to message.topic and handle if JSON is not valid
        let object = null;
        if (gpt) {
            try {
                const result = JSON.parse(gpt);

                object = result;
            } catch (e) {
                object = {
                    object_id: 'unknown',
                    object_name: 'unknown'
                }
            }
        }

        payload.logger.info('extractObject', object);

        return object;
    }
}