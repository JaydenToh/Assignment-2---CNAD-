# Use Node.js to build the React frontend
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first for dependency caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project, including `src/services/translate.js`
COPY . .

# Build the frontend (ensures `translate.js` is compiled into the final build)
RUN npm run build

# Use Nginx to serve the built frontend
FROM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Copy the built React app from the previous stage
COPY --from=build /app/dist .

# Expose port 80 for serving the frontend
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
