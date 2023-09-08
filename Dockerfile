# Use an official Node.js runtime as a base image
FROM node:18

ARG PORT

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose the port on which the Node.js application runs
EXPOSE ${PORT}

# Command to start the application
CMD ["npm", "start"]