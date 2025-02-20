ARG NODE_VERSION=22.14.0
ENV NODE_ENV=production
ENV TZ="Europe/London"
FROM node:${NODE_VERSION}-slim 
COPY  . .
WORKDIR /app

# Run
EXPOSE 3001
RUN yarn install --production
CMD [ "node", "index.js" ]
