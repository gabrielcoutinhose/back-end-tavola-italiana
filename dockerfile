# Use a minimal Node.js base image (Alpine for smaller size)
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Add a non-root user to the container
RUN addgroup -S appgroup && adduser -S --ingroup appgroup --disabled-password appuser

# Adjust permissions for non-root user
RUN chown -R appuser:appgroup /app && chmod -R 750 /app

# Switch to non-root user
USER appuser

# Creating and setting the .yarnrc (only for test)
RUN touch /app/.yarnrc && chown appuser:appgroup /app/.yarnrc

# Copy the package.json and yarn.lock files to install dependencies
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile --only=prod

# Copy the rest of the application code
COPY . .

# Set default environment variable
ENV NODE_ENV=${NODE_ENV:-dev}

# Expose the application's port
EXPOSE 3000

# Default command for running the application
CMD ["sh", "-c", "yarn run ${NODE_ENV}"]
