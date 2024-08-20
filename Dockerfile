FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

EXPOSE 80
# Start your React app
CMD ["npm", "run", "dev", "--", "--port", "80"]