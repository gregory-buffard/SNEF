# Starting from the base image node:14
FROM node:20.3.1

# Set the working directory for the frontend
WORKDIR ./

# Copy package.json and package-lock.json files to the frontend directory
COPY ./ ./

# Install dependencies for the frontend
RUN npm install

# Expose the port your app runs on
EXPOSE 3000

# Command to start the application
CMD ["npm", "backend-raw"]
CMD [ "npm", "client-dev" ]
