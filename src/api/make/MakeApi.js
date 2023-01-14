const { HttpClient } = require("../../common/base/HttpClientBase");
const { decorate, injectable } = require("inversify");

class MakeApiService extends HttpClient {
    constructor() {
        super("https://hook.eu1.make.com", {})
    }
}

decorate(injectable(), MakeApiService);

module.exports = { MakeApiService };
