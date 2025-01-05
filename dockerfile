# Use a minimal Node.js base image (Alpine for smaller size)
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and yarn.lock files to install dependencies
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Set default environment variable
ENV NODE_ENV=${NODE_ENV:-development}

# Expose the application's port
EXPOSE 3000

# Default command for running the application
CMD ["sh", "-c", "yarn run ${NODE_ENV}"]
