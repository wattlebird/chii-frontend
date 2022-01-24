FROM node:16 as build

WORKDIR /code
COPY . .
RUN yarn workspace schema install \
  && yarn workspace schema generate \
  && yarn workspace app install \
  && yarn workspace app build

FROM nginx:latest

COPY packages/app/public /usr/share/nginx/html

COPY --from=build /code/packages/app/prod /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]