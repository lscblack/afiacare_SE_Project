#!/bin/bash

# Find the PID of the UVicorn process running on port 8000
sudo lsof -i :8000

# Kill the process using the PID
sudo kill -9 <PID>

# Install requirements
pip install -r requirements.txt

# Start uvicorn in background with nohup
nohup uvicorn main:app --reload > uvicorn.log 2>&1 &

echo "started AfiaCare Backend"