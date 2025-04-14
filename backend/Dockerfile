# Use the official Python image from the Docker Hub
FROM python:3.9-slim

# Install PostgreSQL development libraries (for psycopg2)
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements.txt file into the container
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire Flask app into the container
COPY . .

# Make sure entrypoint script is executable
RUN chmod +x ./entrypoint.sh

# Expose the port that the Flask app runs on (default is 5000)
EXPOSE 5000

# Set the environment variable for Flask
ENV FLASK_APP=backend

# Run the Flask application using python -m flask
#CMD ["python", "-m", "flask", "run", "--host=127.0.0.1"]
#CMD ["python", "-m", "flask", "run", "--host=0.0.0.0"]
# Use custom entrypoint to run migrations + start the server
CMD ["./entrypoint.sh"]