/*
* Date: 12/03/2025 - 25/03/2025
* Author: Aniket Mishra
* Purpose: Generate placeholder content for portfolio website
* Copyright © 2025 Aniket Mishra. All rights reserved.
*/

// Creating placeholder images for portfolio projects
document.addEventListener('DOMContentLoaded', function() {
  // Configuration for project placeholders
  const projects = [
    {
      id: 'cortrade',
      title: 'Cortrade.co',
      subtitle: 'E-commerce Trading Platform',
      bgColor: '#2b3c7e',
      icon: '📊'
    },
    {
      id: 'socialcop',
      title: 'SocialCop',
      subtitle: 'Traffic Reporting App',
      bgColor: '#2a653f',
      icon: '🚦'
    }
  ];

  // Generate placeholders for each project
  projects.forEach(project => {
    generatePlaceholder(project);
  });

  // Create a canvas placeholder for projects
  function generatePlaceholder(project) {
    const canvas = document.createElement('canvas');
    const width = 800;
    const height = 600;
    canvas.width = width;
    canvas.height = height;
    
    const ctx = canvas.getContext('2d');
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, project.bgColor);
    gradient.addColorStop(1, adjustColor(project.bgColor, -40));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Draw subtle pattern
    drawPattern(ctx, width, height, project.bgColor);
    
    // Central container
    const containerWidth = 600;
    const containerHeight = 400;
    const containerX = (width - containerWidth) / 2;
    const containerY = (height - containerHeight) / 2;
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.roundRect(containerX, containerY, containerWidth, containerHeight, 15);
    ctx.fill();
    
    // Container border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Project icon
    ctx.font = '100px Arial, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(project.icon, width / 2, height / 2 - 60);
    
    // Project title
    ctx.font = 'bold 48px Arial, sans-serif';
    ctx.fillText(project.title, width / 2, height / 2 + 30);
    
    // Project subtitle
    ctx.font = '24px Arial, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText(project.subtitle, width / 2, height / 2 + 80);
    
    // Add decorative elements
    drawDecorativeElements(ctx, width, height, project);
    
    // Apply the placeholder to matching image elements
    const imgElements = document.querySelectorAll(`img[src*="${project.id}"]`);
    if (imgElements.length > 0) {
      imgElements.forEach(img => {
        img.src = canvas.toDataURL('image/png');
        console.log(`Placeholder generated for ${project.id}`);
      });
    }
  }
  
  // Draw a subtle background pattern
  function drawPattern(ctx, width, height, baseColor) {
    const darkerColor = adjustColor(baseColor, -20);
    ctx.fillStyle = darkerColor;
    ctx.globalAlpha = 0.05;
    
    const size = 30;
    for (let x = 0; x < width; x += size) {
      for (let y = 0; y < height; y += size) {
        ctx.globalAlpha = Math.random() * 0.05 + 0.02;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    ctx.globalAlpha = 1;
  }
  
  // Draw decorative elements based on project type
  function drawDecorativeElements(ctx, width, height, project) {
    const elements = 15;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    
    for (let i = 0; i < elements; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 20 + 5;
      const alpha = Math.random() * 0.3 + 0.1;
      
      ctx.globalAlpha = alpha;
      
      if (project.id === 'cortrade') {
        // Chart-like elements for trading platform
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + size, y - size);
        ctx.lineTo(x + size * 2, y - size * 0.5);
        ctx.lineTo(x + size * 3, y - size * 1.5);
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.stroke();
      } else {
        // Map pin-like elements for traffic app
        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + size);
        ctx.lineWidth = size / 5;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.stroke();
      }
    }
    
    ctx.globalAlpha = 1;
  }

  // Utility function to adjust hex color
  function adjustColor(hex, amount) {
    let R = parseInt(hex.substring(1, 3), 16);
    let G = parseInt(hex.substring(3, 5), 16);
    let B = parseInt(hex.substring(5, 7), 16);

    R = Math.max(0, Math.min(255, R + amount));
    G = Math.max(0, Math.min(255, G + amount));
    B = Math.max(0, Math.min(255, B + amount));

    return '#' + 
      R.toString(16).padStart(2, '0') +
      G.toString(16).padStart(2, '0') +
      B.toString(16).padStart(2, '0');
  }
}); 