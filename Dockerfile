# Base image pinned to the minimum runtime required by the Expo SDK 45 lockfile.
FROM node:18.20.8

# Expo SDK 45 delegates its CLI entrypoint to the legacy global package.
RUN npm install -g expo-cli@6.3.10

# Set working directory
WORKDIR /app

# Copy dependency files first (better caching)
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the source code
COPY . .

# Expo web runs on port 19006
EXPOSE 19006

# Default command -> run Expo web
CMD ["yarn", "web"]
