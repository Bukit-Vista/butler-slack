const axios = require("axios");

module.exports = {
    getHarGeneralKnowledge: async function () {
        console.log('[CODA]', "getHarGeneralKnowledge", 'Start')

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
    },
    getRow: async function (docId, tableIdOrName, rowIdOrName) {
        console.log('[CODA]', "getRow", 'Start')

        try {
            const response = await axios({
                method: "get",
                url: `https://coda.io/apis/v1/docs/${docId}/tables/${tableIdOrName}/rows/${rowIdOrName}`,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.CODA_API_KEY}`
                }
            });
            const data = response.data;
            console.log('[CODA]', "getRow", 'response', data.id, data.name)
            return data;
        } catch (error) {
            console.error(error.data);
        }
    },
    updateRow: async function (docId, tableIdOrName, rowIdOrName, values) {
        console.log('[CODA]', "updateRow", 'Start')

        /*
        Values is an array of objects with column and value key
        */

        try {
            const response = await axios({
                method: "put",
                url: `https://coda.io/apis/v1/docs/${docId}/tables/${tableIdOrName}/rows/${rowIdOrName}`,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.CODA_API_KEY}`
                },
                data: {
                    "row": {
                        "cells": values
                    }
                }
            });
            const data = response.data;
            console.log("updateRow", 'response', data)
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    getColumns: async function (docId, tableIdOrName) {
        console.log('[CODA]', "getColumns", 'Start')

        /*
        Values is an array of objects with column and value key
        */

        try {
            const response = await axios({
                method: "get",
                url: `https://coda.io/apis/v1/docs/${docId}/tables/${tableIdOrName}/columns`,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.CODA_API_KEY}`
                }
            });
            const data = response.data.items;
            console.log('[CODA]', "getColumns", 'response', data.length)
            return data;
        } catch (error) {
            console.error(error.data);
        }
    }
}