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

CMD ["sh", "-c", "yarn run ${NODE_ENV}"]

EXPOSE 3000