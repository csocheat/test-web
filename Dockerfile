FROM node:18-alpine

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml .npmrc ./

RUN pnpm install

COPY .next .next
COPY public public

EXPOSE 3000
CMD ["npm", "start"]
