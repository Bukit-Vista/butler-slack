const { HttpClient } = require("@base/HttpClientBase");
const { MakeWebhookUri } = require("@constant/MakeWebhookUri");
const { decorate, injectable } = require("inversify");

class MakeApiService extends HttpClient {
    /**
     * @protected
     * @type {MakeWebhookUri}
     */
    uri;

    constructor() {
        super("https://hook.eu1.make.com", {});
        this.uri = MakeWebhookUri;
    }
}

decorate(injectable(), MakeApiService);

module.exports = { MakeApiService };
