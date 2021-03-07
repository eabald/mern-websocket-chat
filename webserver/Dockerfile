FROM nginx:alpine

COPY nginx.conf /etc/nginx/

COPY upstream.conf /etc/nginx/conf.d/upstream.conf
RUN rm /etc/nginx/conf.d/default.conf
COPY sites/default.conf /etc/nginx/conf.d/default.conf
COPY certs/server.crt /etc/nginx/ssl/server.crt
COPY certs/server.key /etc/nginx/ssl/server.key

CMD ["nginx"]

EXPOSE 80 443
