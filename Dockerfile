FROM node:12.16.2-alpine
WORKDIR /app
COPY package.json package-lock.json ./
# RUN npm ci --only=production
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "production" ]; \
      then npm ci --only=production; \
      else npm ci; \
      fi

COPY . ./
EXPOSE 3000
CMD npm run start:jwt
