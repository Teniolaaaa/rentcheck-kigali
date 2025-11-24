#!/bin/bash

# Deploy the frontend application
echo "Deploying frontend application..."
cd frontend
npm install
npm run build
cp -r dist/* /var/www/html/ # Adjust the path as necessary for your web server
echo "Frontend deployment completed."

# Deploy the backend application
echo "Deploying backend application..."
cd ../backend
pip install -r requirements.txt
# Assuming the backend is run using a service manager like systemd
sudo systemctl start rentcheck.service
echo "Backend deployment completed."

# Notify completion
echo "Deployment of RentCheck Kigali application completed successfully."