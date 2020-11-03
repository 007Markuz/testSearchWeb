FROM node:alpine AS testSearchWeb
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx:alpine
COPY --from=testSearchWeb /app/dist/testSearchWeb /usr/share/nginx/html
COPY --from=testSearchWeb /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
