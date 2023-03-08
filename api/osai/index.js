const axios = require("axios");

module.exports = {
    questionAnswer: async function (payload) {
        console.log("questionAnswer", 'api')
        try {
            const response = await axios({
                method: "post",
                url: "https://flask.bukitvista.com/api/operations-super-ai",
                headers: {
                    "Content-Type": "application/json",
                    "user-id": process.env.FLASK_USER_ID,
                    "token": process.env.FLASK_USER_TOKEN
                },
                data: payload
            });
            const answer = response.data;
            console.log("questionAnswer", 'response', answer)
            return answer;
        } catch (error) {
            console.error(error);
        }
    }
}