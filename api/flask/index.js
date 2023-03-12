const axios = require("axios");

module.exports = {
    questionAnswer: async function (body) {
        console.log('[FLASK]', "questionAnswer", 'api')
        try {
            const response = await axios({
                method: "post",
                url: "https://flask.bukitvista.com/api/operations-super-ai",
                headers: {
                    "Content-Type": "application/json",
                    "user-id": process.env.FLASK_USER_ID,
                    "token": process.env.FLASK_USER_TOKEN
                },
                data: {
                    question: body.event.text,
                    tag_id: body.topic.id,
                    knowledge_source: body.topic.knowledge_source,
                }
            });
            const answer = response.data;
            console.log("questionAnswer", 'response', answer)
            return answer;
        } catch (error) {
            console.error(error);
        }
    }
}