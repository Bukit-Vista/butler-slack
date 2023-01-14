const { MakeApiService } = require("./base/MakeApiService");
const { decorate, injectable } = require("inversify");

class MakePropertyApiService extends MakeApiService {
    /**
     * @public
     */
    async getProperties() {
        return await this.instance.get(this.uri.properties);
    }
}

decorate(injectable(), MakePropertyApiService);

module.exports = { MakePropertyApiService };
