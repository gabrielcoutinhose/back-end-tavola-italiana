FROM node:22-alpine

ARG MODE=dev
ENV NODE_ENV=${MODE}

WORKDIR /app

RUN addgroup -S appgroup && adduser -S --ingroup appgroup --disabled-password appuser
RUN chown -R appuser:appgroup /app && chmod -R 750 /app
RUN touch /app/.yarnrc && chown appuser:appgroup /app/.yarnrc

COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

EXPOSE ${PORT:-3001}

CMD ["sh", "-c", "yarn run ${NODE_ENV}"]
