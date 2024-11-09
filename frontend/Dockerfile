FROM buildpack-deps:bookworm

RUN apt-get update && apt-get install -y nodejs npm

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g serve

COPY ./dist /app/build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
