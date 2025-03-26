#!/bin/bash
# Deploy script for Aniket's Portfolio Website
# Copyright © 2025 Aniket Mishra. All rights reserved.

echo "===========================================" 
echo "      Deploying to GitHub Pages"
echo "===========================================" 

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Run linting
echo "Running linting checks..."
npm run lint

# Check for broken links (don't fail if some links are broken)
echo "Checking for broken links..."
npm run check-links || echo "Some links might be broken, continuing deployment..."

# Build the optimized production version
echo "Building optimized production version..."
npm run build:prod

# Add all files to git
echo "Adding files to git..."
git add .

# Commit changes
echo "Committing changes..."
read -p "Enter commit message: " commit_message
git commit -m "$commit_message"

# Push to GitHub
echo "Pushing to GitHub..."
git push origin main

echo "===========================================" 
echo "        Deployment Complete!"
echo "===========================================" 
echo "Your website should be live at: https://GaLiIeo.github.io/aniket.github.io"
echo "===========================================" 