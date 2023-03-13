const axios = require("axios");
const Trello = require("trello");
const trello = new Trello(process.env.TRELLO_API_KEY, process.env.TRELLO_API_TOKEN);

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
    },
    addCard: async function (data) {
        console.log('[Trello]', "addCard", data.title)

        try {
            const card = await trello.addCard(data.title, data.description, data.list_id)
                .then((trelloCard) => {
                    console.log('[Trello]', "addCard", 'Added card:', trelloCard.id);
                    return trelloCard;
                });
            return {
                success: true,
                data: card
            };
        } catch (error) {
            console.error(error);
        }
    }
}