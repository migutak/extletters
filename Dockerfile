### STAGE 1: Build ###
# base image
FROM nginx:1.16.0-alpine

COPY nginx.conf /etc/nginx/nginx.conf

# copy artifact build from the 'build environment'
COPY dist/extletters /usr/share/nginx/html

# expose port 80
EXPOSE 80
EXPOSE 443

# run nginx
CMD ["nginx", "-g", "daemon off;"]
# docker build -t migutak/extletters .
# docker push migutak/extletters
# docker save -o migutak_extletters.tar migutak/extletters
# docker run -it -d -p 9080:80 --name extletters migutak/extletters

