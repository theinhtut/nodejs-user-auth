FROM node:12.16.2
WORKDIR /app
COPY package.json package-lock.json .
RUN npm ci
COPY . ./
EXPOSE 3000
CMD npm run start:jwt
