'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const get = require('./get');
const app = express();
const router = express.Router();

const port = process.env.PORT || 8088;
const API_KEY = process.env.API_KEY;

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

    let url = getFlickrUrl('method=flickr.photos.search', `text=${search}`, 'per_page=16', `page=${page}`);

    return get(url)
      .then(json => json.photos)
      .then(({ pages, photo : photos }) => {
        if (page > pages) {
          return [];
        }

        let promises = photos.map(photo => {
          return getImageUrl(photo.id).then(url => {
            return {
              id: photo.id,
              title: photo.title,
              url: url
            }
          })
        });
        return Promise.all(promises);
      })
      .then(result => {
        res.json(result);
      })
      .catch(err => respondWithError(res, err));
  });

function getImageUrl(id) {
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

      return  medium || original;
    });
}

router.route('/images/:id/details/')
  .get((req, res) => {
    let { id } = req.params;
    
    Promise.all([getImageDetails(id), getImageUrl(id)])
      .then(([imageDetails, imageUrl]) => {
        imageDetails.url = imageUrl;
        res.json(imageDetails);
      })
      .catch(err => respondWithError(res, err));
  });

function getImageDetails(id) {
  let url = getFlickrUrl('method=flickr.photos.getInfo', `photo_id=${id}`);

  return get(url)
    .then(result => {
      let { id, title, description, dates, tags } = result.photo;
      return {
        id: id._content,
        title: title._content,
        description: description._content,
        posted: moment.unix(dates.posted).format('DD MMM YYYY'),
        tags: tags.tag.map(tag => tag.raw)
      };
    });
}

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
  console.log(err);
}

app.use('/api', router);
app.listen(port);

console.log('Server started, listening on port: ' + port);
module.exports = app;
