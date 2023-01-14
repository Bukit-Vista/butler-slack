const axios = require("axios").default;
const { decorate, injectable, unmanaged } = require("inversify");

/**
 * @typedef {import("axios").AxiosInstance} AxiosInstance
 * @typedef {import("axios").AxiosResponse} AxiosResponse
 */

class HttpClient {
    /**
     * @protected
     * @type {AxiosInstance}
     */
    instance;
    /**
     * @private
     * @type {string}
     */
    baseUrl;
    /**
     * @private
     * @type {object}
     */
    headers;

    /**
     * @param {string} baseUrl
     * @param {object} headers
     */
    constructor(baseUrl, headers) {
        this.baseUrl = baseUrl;
        this.headers = headers;

        this.instance = axios.create({
            baseURL: this.baseUrl,
            headers: this.headers,
        });

        this.#initializeResponseInterceptor();
    }

    #initializeResponseInterceptor() {
        this.instance.interceptors.response.use(
            this.#handleResponse,
            this.handleError,
        );
    }

    /**
     * @param {AxiosResponse} response
     */
    #handleResponse(response) {
        return response;
    }

    /**
     * @param {any} error
     */
    handleError(error) {
        return Promise.reject(error);
    }
}

decorate(injectable(), HttpClient);
decorate(unmanaged("baseUrl"), HttpClient, 0);
decorate(unmanaged("headers"), HttpClient, 1);

module.exports = { HttpClient };
