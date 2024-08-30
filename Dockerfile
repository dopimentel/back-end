FROM node:18-alpine

RUN mkdir -p /app && chown -R node:node /app
USER node

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node src src
COPY --chown=node:node .env .
# COPY --chown=node:node .editorconfig .
# COPY --chown=node:node .eslintignore .
# COPY --chown=node:node .eslintrc.json .
COPY --chown=node:node .sequelizerc .
COPY --chown=node:node tsconfig.json .

EXPOSE 3001