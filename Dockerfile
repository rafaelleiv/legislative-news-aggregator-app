# Use the official Node.js image based on Alpine Linux for the build stage
FROM node:20-alpine AS builder

# Set the working directory inside the container for the build stage
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Copy all files from the current directory to the working directory
COPY . .

# Copy wait-for-it.sh to a directory unaffected by volumes
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh

# Ensure wait-for-it.sh has execution permissions
#RUN chmod +x /usr/local/bin/wait-for-it.sh

# Install dependencies specified in package.json
RUN npm install

# Build the application
RUN npm run build

# Use the official Node.js image based on Alpine Linux for the runtime stage
FROM node:20-alpine AS runner

# Set the working directory inside the container for the runtime stage
WORKDIR /app

# Copy the built application from the build stage to the runtime stage
COPY --from=builder /app ./

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the application in production mode
#CMD ["npm", "run", "start"]
