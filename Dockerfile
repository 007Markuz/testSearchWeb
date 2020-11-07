FROM nginx:alpine

COPY ./dist/testSearchWeb /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
#CMD npm start
