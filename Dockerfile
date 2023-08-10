FROM node:alpine as builder

WORKDIR /app
COPY . .

RUN npm i -g pnpm
RUN pnpm install
RUN pnpm build

FROM nginx:alpine as runtime
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /data/www

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

