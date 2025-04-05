# Stage 1: Build Angular SSR
FROM node:18 as builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Stage 2: Run SSR
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist/fullstackfrontendapp/browser ./browser
COPY --from=builder /app/dist/fullstackfrontendapp/server ./server
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev
ENV NODE_ENV=production
ENV PORT=4000
EXPOSE 4000
CMD ["node", "./server/server.mjs"]