const flask = require("../../api/flask");

module.exports = {
    getKnowledge: async function (payload) {
        payload.logger.info("getKnowledge", 'controller')
        try {
            const response = await flask.questionAnswer(payload.body);

            if (!response.error) {
                const data = response.data[0];

                if (data.knowledge_found) {
                    return data
                }
            } else {
                return {
                    answer: `Osai error: ${response.msg}`,
                    knowledge_source_name: "",
                    object_type: "",
                    object_name: "",
                    tag: "",
                    link: ""
                }
            }

        } catch (error) {
            console.error(error);
        }
    }
}
