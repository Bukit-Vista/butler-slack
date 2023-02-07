const axios = require('axios');
const qs = require('querystring');
const apiUrl = 'https://slack.com/api';

// Dev Base URL
const baseURLBVGo = "https://api.bukitvista.com:5000"

// Production Base URL
// const baseURLBVGo = "https://api.bukitvista.com"

const callAPIMethod = async (method, payload) => {
  let data = Object.assign({ token: process.env.SLACK_ACCESS_TOKEN }, payload);
  let result = await axios.post(`${apiUrl}/${method}`, qs.stringify(data));
  return result.data;
}

const callGetAPIMethod = async (method, params) => {
  let result = await axios.get(`${apiUrl}/${method}`, {
    headers: {
      "Authorization": "Bearer " + process.env.SLACK_ACCESS_TOKEN
    },
    params,
  })

  return result.data
}

const callBVGoAPI = async (url, email, params = null) => {
  const {token, user_id} = await getUserInfo(email)

  let result = await axios.get(`${baseURLBVGo}/${url}`, {
    headers: {
      token,
      user_id
    },
    params,
  })
  return result.data
}

const postBVGoAPI = async (url, email, { params, data }) => {
  const { token, user_id } = await getUserInfo(email)

  let result = await axios.post(`${baseURLBVGo}/${url}`, data, {
    headers: {
      token,
      user_id
    },
    params,
  })
  return result.data
}

const getUserInfo = async (email) => {
  let result = await axios.get(`https://hook.eu1.make.com/geqh22x29b1w21bgkujadye7fk9zw7p3`, {
    params: {
      email,
      apikey: process.env.BIGRR_ACCES_TOKEN
    }
  })

  return result.data
}

module.exports = {
  callAPIMethod,
  callGetAPIMethod,
  callBVGoAPI,
  postBVGoAPI,
  getUserInfo
}