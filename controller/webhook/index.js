const { notesWebhook } = require('./notesWebhook');


module.exports = {
    events: (req, res, app) => {

        const data = req.body;

        // Switch on the action type
        switch (data.action) {
            case 'notes.insert':
                res.end('Event received');
                notesWebhook(req, app);
                break;
            default:
                console.log('Event handler not found', data.action);
                res.writeHead(404);
                res.end('Event handler not found');
        }

    }
}