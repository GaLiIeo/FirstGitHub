/*
* Date: 24/03/2025
* Author: Aniket Mishra
* Purpose: Generate placeholder project images using HTML Canvas
* Copyright © 2025 Aniket Mishra. All rights reserved.
*/

// Function to create placeholder images for projects
function createPlaceholderImage(width, height, bgColor, text, textColor) {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    
    // Get the canvas context
    const ctx = canvas.getContext('2d');
    
    // Fill the background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
    
    // Add gradient overlay
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Add some visual elements
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        const size = Math.random() * 50 + 20;
        const x = Math.random() * (width - size);
        const y = Math.random() * (height - size);
        ctx.moveTo(x, y);
        ctx.lineTo(x + size, y + size);
        ctx.strokeStyle = textColor + '50'; // 50% opacity
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    
    // Add text
    ctx.font = 'bold 24px var(--font-mono), monospace';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);
    
    // Add dimensions text
    ctx.font = '16px var(--font-mono), monospace';
    ctx.fillText(`${width}x${height}`, width / 2, height / 2 + 30);
    
    // Convert to data URL
    return canvas.toDataURL('image/jpeg', 0.9);
}

// Create project placeholders
window.addEventListener('DOMContentLoaded', () => {
    // Define our projects
    const projects = [
        {
            selector: 'img[src="public/image/projects/web-project.jpg"]',
            width: 800,
            height: 600,
            bgColor: '#3498db',
            text: 'Web Application',
            textColor: '#ffffff'
        },
        {
            selector: 'img[src="public/image/projects/cloud-project.jpg"]',
            width: 800,
            height: 600,
            bgColor: '#9b59b6',
            text: 'Cloud Architecture',
            textColor: '#ffffff'
        },
        {
            selector: 'img[src="public/image/projects/ai-project.jpg"]',
            width: 800,
            height: 600,
            bgColor: '#2ecc71',
            text: 'AI & Machine Learning',
            textColor: '#ffffff'
        }
    ];
    
    // Generate and replace placeholders
    projects.forEach(project => {
        const imgElement = document.querySelector(project.selector);
        if (imgElement) {
            const dataUrl = createPlaceholderImage(
                project.width,
                project.height,
                project.bgColor,
                project.text,
                project.textColor
            );
            imgElement.src = dataUrl;
        }
    });
}); 