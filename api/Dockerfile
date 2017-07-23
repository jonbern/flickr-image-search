FROM node:8.2

COPY . /api

WORKDIR /api

RUN ["npm", "install"]

ENV PORT 8088
ENV NODE_ENV production
EXPOSE 8088

CMD ["npm", "run", "start"]
