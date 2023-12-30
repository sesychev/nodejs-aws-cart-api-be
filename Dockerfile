#Development
FROM node:17-alpine as dev
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

#Build
FROM node:17-alpine as build
WORKDIR /app
COPY --from=dev /app/package*.json ./
COPY --from=dev /app/node_modules ./node_modules
COPY . .
RUN npm run build

ENV NODE_ENV prod
RUN npm install --only=prod && npm cache clean --force

#Production
FROM node:17-alpine as prod
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

USER node

EXPOSE 8080

CMD ["node", "dist/main.js"]