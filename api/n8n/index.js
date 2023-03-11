const axios = require("axios");

module.exports = {
    getPartnershipKnowledge: async function (body) {
        console.log('[n8n]', "getPartnershipKnowledge", 'api')
        try {
            const response = await axios({
                method: "post",
                url: "https://n8n.bukitvista.com/webhook/gpt3",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + process.env.N8N_API_KEY
                },
                data: body
            });
            const answer = response.data;
            console.log('[n8n]', "getPartnershipKnowledge", 'response', answer)
            return answer;
        } catch (error) {
            console.error('[n8n]', 'getPartnershipKnowledge Error', error.code);
            return {
                answer: `N8n error: ${error.code}`,
                link: ""
            };
        }
    }
}