const { decorate, injectable } = require("inversify");

class SlackCommandService {
    /**
     * @public
     * @param {Record<string, any>} values
     */
    // eslint-disable-next-line no-unused-vars
    payload(values) {
        const message = `Method "payload()" must be implemented!`;
        throw new TypeError(message);
    }
}

decorate(injectable(), SlackCommandService);

module.exports = { SlackCommandService };
