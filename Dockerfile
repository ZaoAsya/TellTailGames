FROM node:8

# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./
COPY next.config.js /
RUN npm install
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY . .
EXPOSE  3000

CMD ["npm", "run", "dev"]
