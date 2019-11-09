# build node-gyp modules in different stage
FROM node:10-alpine as build-stage

COPY package.json yarn.lock ./

RUN yarn

COPY src ./src
COPY webpack.config.js ./


RUN yarn build

# production environment
FROM nginx:1.17.3-alpine
COPY --from=build-stage /dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
