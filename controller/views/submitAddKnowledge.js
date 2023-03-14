const trello = require('../../api/trello');
const message = require('../message');

module.exports = {
    submitAddKnowledge: async (payload) => {
        payload.logger.info('submitAddKnowledge', payload.body.type);

        const values = payload.view.state.values;

        // Switch on knowledge source
        switch (values.knowledge_source.knowledge_source.selected_option.value) {
            case '1': // Airbnb listing
                // Add to Trello
                const data = {
                    title: `[${values.knowledge_source.knowledge_source.selected_option.text.text}] - Add info about ${values.tag.tag.value} for ${values.object_name.object_name.value}`,
                    description: `**Tag:** ${values.tag.tag.value}\n**Object name:** ${values.object_name.object_name.value}\n**Knowledge:** ${values.answer.answer.value}`,
                    list_id: '5b978343e8643f897f444540', // New request
                    board_id: '5f447a1b202a2b4974bd0e7e' // Content request
                }
                payload.body.submissionResult = await trello.addCard(data);
                break;
            default:
                break;
        }

        // Send feedback to user
        if (payload.body.submissionResult && payload.body.submissionResult.success) {
            // Send reply message
            const text = `Successfully submitted!`;
            const context = `${payload.view.title.text} successfully submitted!`
            await message.sendSuccessSubmitMessage(payload);
            payload.logger.info('submitAddKnowledge', 'Success');
        } else {
            payload.logger.info('submitAddKnowledge', "Error");
        }

    }
}