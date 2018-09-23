from node:carbon

WORKDIR /usr/src/app

COPY yarn.lock ./
COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3000
EXPOSE 35729

CMD ["yarn", "start"]