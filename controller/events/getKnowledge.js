const flask = require("../../api/flask");

module.exports = {
    getKnowledge: async function (payload) {
        payload.logger.info("getKnowledge", 'controller')
        try {
            const response = await flask.questionAnswer(payload.body);

            if (!response.error) {
                const data = response.data[0];

                if (data.knowledge_found) {
                    return {
                        text: data.answer,
                        link: data.object_id
                    }
                }
            } else {
                return {
                    text: `Osai error: ${response.msg}`,
                    link: ''
                }
            }

        } catch (error) {
            console.error(error);
        }
    }
}
