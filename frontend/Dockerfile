# Step 1: Build the Angular app
FROM node:22.11.0 AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the Angular app and build it
COPY . .
RUN npm run build 
#RUN ng serve 
RUN echo "Contents of /app/:" && ls -l /app/

RUN echo "Contents of /app/dist:" && ls -l /app/dist
RUN echo "Contents of /app/dist/fullstackfrontendapp:" && ls -l /app/dist/fullstackfrontendapp

# Step 2: Serve the Angular app using a lightweight web server
FROM nginx:alpine

# Copy the Angular build output from the build image
COPY --from=build /app/dist/fullstackfrontendapp/browser /usr/share/nginx/html

# Optional: custom Nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port Nginx is running on
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
