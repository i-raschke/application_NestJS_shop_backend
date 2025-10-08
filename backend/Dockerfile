FROM node:20.7.0

#NODE_ENV="development"
ENV CI=true
WORKDIR /backend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 7331
RUN npm run build
CMD ["npm", "run"]