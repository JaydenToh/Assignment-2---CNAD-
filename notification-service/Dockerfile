# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port the app runs on
EXPOSE 3050

# Command to run the application
CMD ["node", "app.js"]
