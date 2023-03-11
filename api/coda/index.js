const axios = require("axios");

module.exports = {
    getHarGeneralKnowledge: async function () {
        console.log('[CODA]', "getHarGeneralKnowledge", 'api')

        const docId = "hsWiQQEz5L";
        const tableIdOrName = "grid-TNAYCHLffd";

        try {
            const response = await axios({
                method: "get",
                url: `https://coda.io/apis/v1/docs/${docId}/tables/${tableIdOrName}/rows`,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.CODA_API_KEY}`
                }
            });
            const answer = response.data;
            console.log("getHarGeneralKnowledge", 'response')
            return answer;
        } catch (error) {
            console.error(error);
        }
    }
}