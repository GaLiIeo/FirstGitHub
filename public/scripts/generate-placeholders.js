/**
 * generate-placeholders.js
 * Created: 2023-07-28
 * Author: Aniket Mishra
 * 
 * Purpose: Generate placeholder images for projects when actual images are not available
 * Copyright © 2023 Aniket Mishra. All rights reserved.
 */

document.addEventListener('DOMContentLoaded', function() {
  // Configuration for placeholders
  const placeholderConfig = [
    {
      id: 'cortrade',
      title: 'Cortrade.co',
      subtitle: 'E-commerce Trading Platform',
      width: 800,
      height: 600,
      backgroundColor: '#2b3c7e', // Professional blue
      textColor: '#ffffff',
      iconName: '📊'
    },
    {
      id: 'socialcop',
      title: 'SocialCop',
      subtitle: 'Traffic Reporting App',
      width: 800, 
      height: 600,
      backgroundColor: '#2a653f', // Professional green
      textColor: '#ffffff',
      iconName: '🚦'
    }
  ];

  // Generate all placeholders
  placeholderConfig.forEach(generatePlaceholder);

  /**
   * Generates a placeholder image for a project
   * @param {Object} config - Configuration for the placeholder
   */
  function generatePlaceholder(config) {
    const canvas = document.createElement('canvas');
    canvas.width = config.width;
    canvas.height = config.height;
    
    const ctx = canvas.getContext('2d');
    
    // Background with gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, config.backgroundColor);
    gradient.addColorStop(1, adjustColor(config.backgroundColor, -40));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw professional pattern
    drawPattern(ctx, canvas.width, canvas.height, config.backgroundColor);
    
    // Draw professional container
    const containerWidth = 600;
    const containerHeight = 400;
    const containerX = (canvas.width - containerWidth) / 2;
    const containerY = (canvas.height - containerHeight) / 2;
    
    // Create container with slight transparency
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.roundRect(containerX, containerY, containerWidth, containerHeight, 15);
    ctx.fill();
    
    // Draw border for container
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw icon
    ctx.fillStyle = config.textColor;
    ctx.font = '100px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(config.iconName, canvas.width / 2, canvas.height / 2 - 60);
    
    // Draw title
    ctx.font = 'bold 48px Arial, sans-serif';
    ctx.fillText(config.title, canvas.width / 2, canvas.height / 2 + 30);
    
    // Draw subtitle
    ctx.font = '24px Arial, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText(config.subtitle, canvas.width / 2, canvas.height / 2 + 80);
    
    // Draw decorative elements (like a professional mockup)
    drawDecorativeElements(ctx, canvas.width, canvas.height, config);
    
    // Save image
    saveImage(canvas, config.id);
  }

  /**
   * Draws a pattern on the canvas for visual interest
   */
  function drawPattern(ctx, width, height, baseColor) {
    // Create slightly darker color for pattern
    const darkerColor = adjustColor(baseColor, -20);
    ctx.fillStyle = darkerColor;
    ctx.globalAlpha = 0.05;
    
    // Draw a more subtle grid pattern
    const size = 30;
    for (let x = 0; x < width; x += size) {
      for (let y = 0; y < height; y += size) {
        // Random opacity for a more dynamic pattern
        ctx.globalAlpha = Math.random() * 0.05 + 0.02;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Reset opacity
    ctx.globalAlpha = 1;
  }
  
  /**
   * Draws decorative elements to make the image look more professional
   */
  function drawDecorativeElements(ctx, width, height, config) {
    // Draw floating elements in the background to represent data or traffic
    const elements = 15;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    
    for (let i = 0; i < elements; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 20 + 5;
      const alpha = Math.random() * 0.3 + 0.1;
      
      ctx.globalAlpha = alpha;
      
      // Draw different shapes based on project
      if (config.id === 'cortrade') {
        // Draw chart-like elements for trading
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + size, y - size);
        ctx.lineTo(x + size * 2, y - size * 0.5);
        ctx.lineTo(x + size * 3, y - size * 1.5);
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.stroke();
      } else {
        // Draw map pin-like elements for traffic app
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
    
    // Reset opacity
    ctx.globalAlpha = 1;
  }

  /**
   * Adjusts a hex color by the specified amount
   */
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

  /**
   * Saves the canvas as an image in the projects directory
   */
  function saveImage(canvas, id) {
    // Convert canvas to data URL
    const dataURL = canvas.toDataURL('image/png');
    
    // Find image elements with matching project image
    const imgElements = document.querySelectorAll(`img[src*="${id}"]`);
    if (imgElements.length > 0) {
      imgElements.forEach(img => {
        img.src = dataURL;
        console.log(`Placeholder generated for ${id}`);
      });
    }
    
    // Find any file inputs that might be used to select project images
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
      // Set a data attribute so the image can be referenced later
      input.dataset[id] = dataURL;
    });
    
    // Log image generation
    console.log(`Image data URL for ${id} generated. In a server environment, this would be saved to disk.`);
  }
}); 