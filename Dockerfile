ARG ARCH=
FROM ${ARCH}nginx:alpine

COPY . /usr/share/nginx/html/
