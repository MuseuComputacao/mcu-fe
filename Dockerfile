# Base image pinned for the Expo SDK 46 compatibility step.
FROM node:18.20.8

# Force the SDK-provided CLI instead of the removed global expo-cli package.
ENV EXPO_USE_LOCAL_CLI=true
# Webpack 4 used by SDK46 needs the OpenSSL 3 legacy provider on Node18.
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
