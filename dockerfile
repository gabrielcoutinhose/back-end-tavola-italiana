FROM node:22-alpine

WORKDIR /app

RUN addgroup -S appgroup && adduser -S --ingroup appgroup --disabled-password appuser

RUN chown -R appuser:appgroup /app && chmod -R 750 /app

USER appuser

RUN touch /app/.yarnrc && chown appuser:appgroup /app/.yarnrc

COPY package*.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

ENV NODE_ENV=${NODE_ENV:-dev}

USER root

RUN apk add --no-cache curl bash && \
    curl -sSL https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz | tar -xz -C /usr/local/bin

USER appuser

ENTRYPOINT ["dockerize", "-wait", "tcp://mongodb:27017", "-wait", "tcp://postgres:5432", "tcp://fluentbit:24224", "-timeout", "6s"]

CMD ["sh", "-c", "yarn run ${NODE_ENV}"]

EXPOSE 3000