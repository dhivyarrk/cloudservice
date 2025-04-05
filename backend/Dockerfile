FROM python:3.9-slim
WORKDIR /app

# Install dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/backend ./backend
COPY backend/migrations ./migrations

# Set environment variables
ENV FLASK_APP=backend.__init__
ENV FLASK_ENV=production
ENV DATABASE_URL=postgresql://postgres:password@db:5432/mydb

EXPOSE 5000
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "backend.backend:create_app()"]