FROM node:16-alpine
WORKDIR /home/projects/rss-rest
COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . .
# EXPOSE 8080
CMD [ "npm", "run", "start:dev" ]
