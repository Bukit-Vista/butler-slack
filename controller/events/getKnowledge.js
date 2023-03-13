const flask = require("../../api/flask");

module.exports = {
    getKnowledge: async function (payload) {
        payload.logger.info("getKnowledge", 'controller')
        try {
            const response = await flask.questionAnswer(payload.body);

            if (response && !response.error) {
                const data = response.data[0];

                return data
            } else {
                return {
                    answer: `Osai error: ${response.msg}`,
                    knowledge_source_name: "",
                    object_type: "",
                    object_name: "",
                    tag: payload.body.topic.tag,
                    link: ""
                }
            }

        } catch (error) {
            console.error(error.response);
        }
    }
}
