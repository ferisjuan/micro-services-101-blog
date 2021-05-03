# Specify a base image
FROM node:alpine

# Define the working directory
WORKDIR /app

# COPY [path_to_folder_on_your_machine] [path_in_the_container]
# e.g.: COPY [current_path] [path_in_the_container]
# divide the copy so the npm install desn't run if some projects
# files are changed only if package.json is chancged
COPY ./package.json ./

# Install some dependencies
RUN npm install

# Copy al files after installing dependencies so it wont re install
# if a project file changes
COPY ./ ./

ENV CI=true

# Default command
CMD ["npm", "start"]
