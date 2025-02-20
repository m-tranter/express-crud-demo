ARG NODE_VERSION=22.14.0
FROM node:${NODE_VERSION}-slim 
ENV NODE_ENV=production
ENV TZ="Europe/London"
ENV PORT=3001

COPY  . .
WORKDIR /app

# Run
EXPOSE 3001
RUN yarn install --production
CMD [ "node", "index.js" ]
