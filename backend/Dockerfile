FROM node:20.7.0 AS builder
WORKDIR /backend

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20.7.0 AS dev

ENV NODE_ENV=development
ENV CI=true

COPY --from=builder /backend /backend

EXPOSE 7331
CMD ["npm", "run", "start:dev"]

FROM node:20.7.0 AS prod
WORKDIR /backend
ENV NODE_ENV=production

RUN npm prune --omit=dev

COPY --from=builder /backend/dist ./dist
COPY --from=builder /backend/node_modules ./node_modules
COPY --from=builder /backend/package.json ./package.json
EXPOSE 7331

CMD ["node", "dist/main"]