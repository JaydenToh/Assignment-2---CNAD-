# Use Node.js image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy rest of the application
COPY . .

# Expose the correct port
EXPOSE 8500

# Start the application
CMD ["node", "server.js"]
