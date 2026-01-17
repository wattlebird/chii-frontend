FROM node:20-alpine as build

WORKDIR /code
COPY . .
RUN pnpm install \
  && pnpm -F app run build

FROM nginx:latest

COPY packages/app/public /usr/share/nginx/html

COPY --from=build /code/packages/app/prod /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]