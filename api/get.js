const fetch = require('fetch-retry');

module.exports = function get(url) {
  return fetch(url)
    .then(response => {
      if (response.ok === true) {
        return response.text();
      } else {
        throw new HttpException(response.status, response.statusText);
      }
    })
    .then(text => parseFlickrJsonResponse(text));
}

function parseFlickrJsonResponse(text) {
  let jsonText = text.substring(0, text.length - 1).replace('jsonFlickrApi(', '');
  return JSON.parse(jsonText);
};

function HttpException(status, statusText) {
  this.status = status;
  this.statusText = statusText;
}