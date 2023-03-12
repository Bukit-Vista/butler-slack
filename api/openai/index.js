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
            console.log('[OPENAI]', 'chat', response);
            return response;
        } catch (error) {
            console.log('chat', error);
            return {};
        }
    },
    davinci: async (prompt) => {

        // console.log('davinci', prompt);
        try {
            const completion = await openai.createCompletion({
                model: "text-davinci-003",
                temperature: 0.0,
                promp: prompt,
            });
            const response = completion.data.choices[0].text.trim();
            console.log('[OPENAI]', 'davinci', response);
            return response;
        } catch (error) {
            console.log('[OPENAI]', 'davinci', error);
            return {};
        }
    },
    betterAnswer: async (question, answer) => {
        // Compose better answer with tone and context

        // console.log('betterAnswer', messages);
        const guidelines = [
            "I want you to act as a hospitality assistant.",
            "You will be given an information and paraphrase it into the following answer tone: hospitable, casual, helpful, and friendly.",
            "Your response is composed for Slack, you can use Slack markdown to format your response.",
            "You can paraphrase the information into a step by step guide, or a list of tips, or a list of questions.",
            "Information: Weather is sunny and warm. The temperature around 25 degrees.",
            `Information: ${answer}`,
        ]

        const messages = [
            {
                role: "system",
                content: guidelines.join("\n")
            },
            {
                role: "user",
                content: "How is the weather today? <@U04MFEQ4MK9>"
            },
            {
                role: "assistant",
                content: "Hi there, the weather will be sunny and warm. \nThe temperature is around 25 degrees. \n\nIt looks like a perfect day to go out and enjoy the sun :sunny:"
            },
            {
                role: "user",
                content: question
            }
        ]
        try {
            const completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                temperature: 0.0,
                messages: messages,
            });
            const response = completion.data.choices[0].message.content.trim();
            console.log('[OPENAI]', 'betterAnswer', response);
            return response;
        } catch (error) {
            console.log('[OPENAI]', 'betterAnswer', error);
            return {};
        }
    }
}