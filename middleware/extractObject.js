const openai = require('../api/openai');
const database = require('../api/database');

module.exports = {
    extractObject: async (payload, objects, object_type) => {
        // User's question
        const question = payload.body.event.text;

        payload.logger.info('extractObject', object_type, question);

        // Compose the message
        const guidelines = [
            "Categorize this question based on these available options and return as json object with number and name as it's elements.",
            "'property' options are:",
            objects.map((object, i) => `${i}. ${object.name}`).join(", "),
            "Return only from the available options.",
            "Question:",
            question
        ];

        console.log('messages', guidelines.join("\n"))

        // Send message to chatGPT to get tag and ID
        const gpt = await openai.davinci(guidelines.join("\n"));
        console.log('gpt', gpt)

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