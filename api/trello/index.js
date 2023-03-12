const axios = require("axios");
var Trello = require("trello");
var trello = new Trello(process.env.TRELLO_API_KEY, process.env.TRELLO_API_TOKEN);

module.exports = {
    getCardsOnBoard: async function (board_id) {
        console.log('[Trello]', "getCardsOnBoard", 'start')

        try {
            const cards = await trello.getCardsOnBoard(board_id);

            console.log('[Trello]', "getCardsOnBoard", 'cards', cards.length)
            return cards;
        } catch (error) {
            console.error(error);
        }
    },
    searchCardOnBoard: async function (board_id, query) {
        console.log('[Trello]', "searchCardOnBoard", 'start')

        try {
            await trello.makeRequest('get', '/1/search', {
                webhooks: true,
                cards_limit: 1,
                query: query,
                idBoards: board_id
            })
                .then((res) => {
                    console.log('[Trello]', "searchCardOnBoard", board_id, res)
                    return res;
                });


        } catch (error) {
            console.error(error);
        }
    }
}