# Base image pinned for the Expo SDK 47 compatibility step.
FROM node:22.23.2

# Force the SDK-provided CLI instead of the removed global expo-cli package.
ENV EXPO_USE_LOCAL_CLI=true
# Expo SDK 47 still uses Webpack 4, which needs the OpenSSL legacy provider on Node 22.
ENV NODE_OPTIONS=--openssl-legacy-provider
# Set working directory
WORKDIR /app

# Copy dependency files first (better caching)
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Expo web runs on port 19006
EXPOSE 19006

# Default command -> run Expo web
CMD ["yarn", "web"]
