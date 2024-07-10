FROM node:16-alpine

ADD ./ /var/www/ejlish
WORKDIR /var/www/ejlish
RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]