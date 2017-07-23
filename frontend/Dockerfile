FROM node:8.2

COPY . /frontend

WORKDIR /frontend

RUN ["npm", "install"]

ENV PORT 8080
EXPOSE 8080

CMD ["npm", "run", "start"]
