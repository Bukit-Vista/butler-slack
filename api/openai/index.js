const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = {
    chat: async (messages) => {

        // console.log('chat', messages);
        try {
            const completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                temperature: 0.0,
                messages: messages,
            });
            const response = completion.data.choices[0].message.content.trim();
            console.log('chat', response);
            return response;
        } catch (error) {
            console.log('chat', error);
            return {};
        }
    }
}