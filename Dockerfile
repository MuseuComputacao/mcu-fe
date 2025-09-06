# Base image with Node.js 16 (compatible with Expo SDK 44)
FROM node:16

# Install expo-cli globally
RUN npm install -g expo-cli

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
