FROM node:16 as build

WORKDIR /code
COPY . .
RUN yarn install && yarn build

FROM nginx:latest

COPY --from=build /code/build /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]