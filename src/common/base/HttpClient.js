const axios = require("axios");

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
   * @type {string}
   */
  baseUrl;
  /**
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
  }
}

module.exports = { HttpClient }

