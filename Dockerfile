FROM node:12.18.1-alpine3.11

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

RUN apk update && apk upgrade
RUN apk add git

COPY package.json /usr/src/nuxt-app
RUN npm install

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN npm run build

# expose 5000 on container
EXPOSE 3000

# set app serving to permissive / assigned
ENV HOST=0.0.0.0
# set app port
ENV PORT=3000

# start the app
CMD [ "npm", "start" ]