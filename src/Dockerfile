# ---- Base image for building ----
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json before installing dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code into the container
COPY . .

# Build the React app
RUN npm run build

# ---- Base image for serving ----
FROM nginx:1.23-alpine

# Copy built files from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 3000
EXPOSE 3000

# Replace default Nginx config with custom config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
