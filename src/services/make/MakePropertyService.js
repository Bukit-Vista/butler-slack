const { MakeApiService } = require("./base/MakeApiService");
const { decorate, injectable } = require("inversify");

class MakePropertyApiService extends MakeApiService {
    /**
     * @public
     */
    async getProperties() {
        const { data } = await this.instance.get(this.uri.properties);

        return data;
    }
}

decorate(injectable(), MakePropertyApiService);

module.exports = { MakePropertyApiService };
