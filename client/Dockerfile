# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Bundle app source by copying all files
COPY . .

# Build the app for production
RUN npm run build

# The port your app will run on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
