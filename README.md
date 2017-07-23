# Flickr Image Search

Flickr image search written in Vue.js and Node.js/express. Uses Docker and NGINX for deployment.

## How to run it:
- run 'docker-compose up'
- browse to http://localhost

## Requirements
- Docker with Docker Compose (compose file version >= 2)

### Ports:
- The application is configured to use port 80. This port needs to be available to run the application, or you need to update docker-compose.yml, and sites.conf in nginx folder.
