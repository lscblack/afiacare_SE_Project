#!/bin/bash

# Install requirements
pip install -r requirements.txt

# Start uvicorn in background with nohup
nohup uvicorn main:app --reload > uvicorn.log 2>&1 &
