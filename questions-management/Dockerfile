# Use Node.js image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy rest of the application
COPY . .

# Expose the port that the app will run on (port 3000)
EXPOSE 9000

# Command to run the application
CMD ["node", "server.js"]
