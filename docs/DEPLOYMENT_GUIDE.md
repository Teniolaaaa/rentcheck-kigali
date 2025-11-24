# Deployment Guide for RentCheck Kigali

## Overview
This document provides a comprehensive guide for deploying the RentCheck Kigali application on the provided web servers (Web01 and Web02) and configuring the load balancer (LB01) to distribute incoming traffic efficiently.

## Prerequisites
- Access to the web servers (Web01 and Web02).
- Basic knowledge of command-line operations.
- NGINX installed on the load balancer server (LB01).
- Python and necessary libraries installed on the backend server.

## Deployment Steps

### 1. Backend Deployment

#### Step 1: Clone the Repository
On both Web01 and Web02, clone the RentCheck Kigali repository:
```bash
git clone https://github.com/yourusername/rentcheck-kigali.git
cd rentcheck-kigali/backend
```

#### Step 2: Set Up a Virtual Environment
Create and activate a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate
```

#### Step 3: Install Dependencies
Install the required Python packages:
```bash
pip install -r requirements.txt
```

#### Step 4: Configure Environment Variables
Copy the example environment file and set your API keys:
```bash
cp .env.example .env
# Edit the .env file to include your API keys and other configurations
```

#### Step 5: Start the Backend Application
Run the FastAPI application:
```bash
uvicorn src.main:app --host 0.0.0.0 --port 8000
```

### 2. Frontend Deployment

#### Step 1: Clone the Repository
On both Web01 and Web02, navigate to the frontend directory:
```bash
cd rentcheck-kigali/frontend
```

#### Step 2: Install Dependencies
Install the required Node.js packages:
```bash
npm install
```

#### Step 3: Build the Frontend Application
Build the application for production:
```bash
npm run build
```

#### Step 4: Serve the Frontend Application
You can use a static file server or configure NGINX to serve the built files. For simplicity, you can use `serve`:
```bash
npm install -g serve
serve -s build -l 3000
```

### 3. Load Balancer Configuration

#### Step 1: Configure NGINX
On the load balancer (LB01), edit the NGINX configuration file located at `deployment/nginx/load_balancer.conf`:
```nginx
http {
    upstream backend {
        server Web01:8000;
        server Web02:8000;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

#### Step 2: Restart NGINX
After saving the configuration, restart NGINX to apply the changes:
```bash
sudo systemctl restart nginx
```

## Testing the Deployment
1. Access the application via the load balancer's IP address or domain name.
2. Verify that the frontend is loading correctly and that it can communicate with the backend.
3. Test the search, sorting, and filtering functionalities to ensure everything is working as expected.

## Conclusion
Following these steps will successfully deploy the RentCheck Kigali application on the specified web servers and configure the load balancer for efficient traffic distribution. For any issues, refer to the logs on the respective servers for troubleshooting.