FROM ubuntu:noble

RUN apt update
RUN apt -y install npm nodejs

WORKDIR /app/
EXPOSE 12080

COPY . .

RUN npm install -g typescript
RUN npm install
RUN tsc

ENTRYPOINT ["node", "."]