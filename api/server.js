'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const get = require('./get');
const app = express();
const router = express.Router();

const port = process.env.PORT || 8088;
const API_KEY = process.env.API_KEY || 'b09fb8d8f7679bc3c876a5de2cb3f35c';

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Code');
  next();
});

router.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});

router.route('/images')
  .get((req, res) => {
    let { search, page = 1 } = req.query;

    if (!search) {
      return res.json([]);
    }

    let url = getFlickrUrl('method=flickr.photos.search', `text=${search}`, 'per_page=25', `page=${page}`);

    return get(url)
      .then(json => json.photos)
      .then(({ pages, photo : photos }) => {
        if (page > pages) {
          return [];
        }

        let promises = photos.map(photo => getImageUrlData(photo));
        return Promise.all(promises);
      })
      .then(result => {
        res.json(result);
      })
      .catch(err => respondWithError(res, err));
  });

function getImageUrlData({id, title}) {
  let url = getFlickrUrl('method=flickr.photos.getSizes', `photo_id=${id}`);
  return get(url)
    .then(json => {
      let medium;
      let original;
      
      for (let size of json.sizes.size) {
        if (size.label && size.label.toLowerCase() === 'medium') {
          medium = size.source;
        }
        if (size.label && size.label.toLowerCase() === 'original') {
          original = size.source;
        }
      }

      return {
        id,
        title,
        url: medium || original
      }
    });
}

router.route('/images/:id/details/')
  .get((req, res) => {
    let { id } = req.params;
    
    let url = getFlickrUrl('method=flickr.photos.getInfo', `photo_id=${id}`);
    
    return get(url)
      .then(result => result.photo)
      .then(({id, title, description, dates, tags}) => {
        res.json({
          id,
          title,
          description,
          posted: dates.posted,
          tags: tags.tag.map(tag => tag.raw)
        });
      })
      .catch(err => respondWithError(res, err));
  });

function getFlickrUrl (...args) {
  let url = `https://api.flickr.com/services/rest/?api_key=${API_KEY}&format=json`;
  
  for (let argument of args) {
    url += '&' + argument;
  }
  return url;  
}

function respondWithError(res, err) {
  if (err.status && err.statusText) {
    res.status(err.status).send(err.status + ' ' + err.statusText);
  } else {
    res.status(500).send(err);
  }
}

app.use('/api', router);
app.listen(port);

console.log('Server started, listening on port: ' + port);
module.exports = app;
