# Aniket Mishra - Portfolio Website

A modern, interactive portfolio website showcasing my skills, experience, and projects as a Business & Information Systems Specialist.

## Features

- Interactive particle background that adapts to light/dark mode
- Animated typing effect for introductory text
- Smooth scrolling and scroll progress indicator
- Animated skill progress bars
- Project gallery with lightbox functionality
- Fully responsive design for all device sizes
- Theme toggle with persistent preference storage
- Locomotive Scroll for smooth scrolling effects
- GSAP animations for enhanced user experience
- AOS (Animate On Scroll) for element animations
- Custom cursor follower for interactive elements
- Loading screen with animation
- Webpack bundling for optimized assets

## Technologies Used

- HTML5
- CSS3 (Custom properties, Flexbox, Grid, Animations)
- JavaScript (ES6+)
- Particles.js for background effects
- Font Awesome for icons
- GSAP for advanced animations
- Locomotive Scroll for smooth scrolling
- AOS for scroll-based animations
- Webpack for asset bundling and optimization
- ESLint and Prettier for code quality

## Getting Started

### Prerequisites
- Node.js (version 14 or later)
- npm (comes with Node.js)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/GaLiIeo/aniket.github.io.git
   cd aniket.github.io
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Your site will be available at `http://localhost:3000`

## Building for Production

To create an optimized production build:

```bash
npm install  # If you haven't already installed dependencies
npm run build
```

The built files will be in the `dist` directory.

## Deployment

This website uses GitHub Actions for automatic deployment to GitHub Pages. When you push changes to the main branch, the site will automatically be deployed.

To deploy manually:

1. Run the deployment script (Linux/Mac):
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

2. Or use these commands:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

3. GitHub Actions will handle the deployment process automatically

4. Your site will be available at `https://GaLiIeo.github.io/aniket.github.io`

## Project Structure

```
.
├── index.html              # Main HTML file
├── style.css               # CSS styles
├── script.js               # Main JavaScript functionality
├── enhanced.js             # Enhanced animations and effects
├── public/                 # Static assets
│   ├── image/              # Images folder
│   └── scripts/            # Additional scripts
├── .github/                # GitHub configuration
│   ├── workflows/          # GitHub Actions workflows
│   └── CODEOWNERS          # Repository ownership
├── .eslintrc.json          # ESLint configuration
├── .prettierrc             # Prettier configuration
├── package.json            # npm dependencies
├── webpack.config.js       # Webpack configuration
└── README.md               # Project documentation
```

## Customization

The website uses CSS custom properties for easy theming. You can modify the color scheme by changing the variables in the `:root` section of the CSS file.

## Security

Please see the [SECURITY.md](SECURITY.md) file for security policies and procedures.

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## Copyright Notice

© 2025 Aniket Mishra. All rights reserved.

This code is protected by copyright law. No part of this website, including but not limited to the code, design, and content, may be reproduced, distributed, or transmitted in any form or by any means without the prior written permission of the copyright owner.

If you wish to use any part of this code for educational or personal purposes, please contact me for permission and ensure proper attribution is given.

## Contact

- Email: mishraaniket267@gmail.com
- LinkedIn: [linkedin.com/in/aniketmishra267](https://linkedin.com/in/aniketmishra267)
- GitHub: [github.com/GaLiIeo](https://github.com/GaLiIeo)

---

Made with ❤️ by Aniket Mishra