FROM node:10

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm install react-bootstrap bootstrap -g
RUN npm install node-sass -g
RUN npm install --save-dev cypress

# add app
COPY . ./

# start app
CMD ["npm", "start"]