# Digital Resume Website

A modern, responsive personal resume website built with HTML, CSS, and JavaScript.

## 🌟 Features

- **Two-Section Scroll Design**: Clean, full-screen snap scrolling between hero and projects sections
- **5-Color Theme System**: Easy-to-customize color palette using CSS variables
- **Mobile-First Responsive**: Optimized for all devices including landscape mobile support
- **Interactive Elements**: Hover effects, animations, and smooth transitions
- **Contact Form**: Built-in contact form with social media links
- **Projects Showcase**: Featured projects with descriptions and links
- **Accessibility**: Touch-friendly interface with proper contrast and sizing

## 🎨 Color Scheme

The website uses a 5-color dark-with-accent theme:
- **Color 1**: `#d3d3d3` - Light text and highlights
- **Color 2**: `#d58d1a` - Primary accent (orange/gold)
- **Color 3**: `#31353b` - Card backgrounds
- **Color 4**: `#191d23` - Main background
- **Color 5**: `#232323` - Deepest elements

## 🛠️ Technology Stack

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Grid, Flexbox, and CSS Variables
- **JavaScript**: Interactive animations and scroll effects
- **GSAP**: Advanced animations and scroll triggers
- **Font Awesome**: Social media icons
- **Google Fonts**: Inter and Fira Code typography

## 📱 Responsive Design

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile Portrait (480px - 767px)
- Mobile Landscape (< 500px height)
- Small devices (320px+)

## 🚀 Live Demo

Visit the live website: [https://jasonshaw0.github.io/digitalresume/](https://jasonshaw0.github.io/digitalresume/)

## 📁 Project Structure

```
├── index.html          # Main HTML file
├── styles.css          # Main stylesheet with responsive design
├── script.js           # JavaScript for animations and interactions
├── js_icon.svg         # Logo/icon file
├── jspfp.PNG          # Profile photo
├── jason-photo.jpg    # Additional photo asset
└── .gitignore         # Git ignore rules
```

## 🎯 Customization

To customize the color scheme, simply update the CSS variables in `styles.css`:

```css
:root {
    --color-1: #your-text-color;
    --color-2: #your-accent-color;
    --color-3: #your-card-background;
    --color-4: #your-main-background;
    --color-5: #your-deepest-background;
}
```

## 💻 Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/jasonshaw0/digitalresume.git
   ```

2. Open `index.html` in your browser or serve with a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

## 📈 Performance Features

- Optimized images and assets
- Minimal JavaScript footprint
- CSS-only animations where possible
- Efficient scroll snap implementation
- Mobile-optimized touch targets

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Jason Shaw** - Electrical Engineering Student | Developer | Tampa, FL
