# Mohammed Adil Siraju - Portfolio Website

A modern, responsive portfolio website for Mohammed Adil Siraju, showcasing his skills as an AI & ML Engineering graduate and aspiring AI/ML Engineer.

## 🚀 Live Demo

Visit the live portfolio: [https://adilsiraju.vercel.app](https://adilsiraju.vercel.app)

## ✨ Features

- **Modern Design**: Clean, professional, and visually appealing interface
- **Responsive**: Fully responsive design that works on all devices
- **Interactive Animations**: Smooth animations powered by Framer Motion
- **Dark Mode Support**: Automatic dark/light mode detection
- **Contact Form**: Functional contact form with email integration
- **Project Showcase**: Detailed project descriptions with live demos and GitHub links
- **Performance Optimized**: Built with Next.js for optimal performance and SEO

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS for utility-first styling
- **Animations**: Framer Motion for smooth, interactive animations
- **Icons**: Lucide React for beautiful, consistent icons
- **Deployment**: Vercel/Netlify ready for serverless deployment

## 📋 Sections

1. **Hero Section** - Introduction with professional tagline and contact information
2. **About Me** - Background, education, and technical skills
3. **Projects** - Featured projects including EcoVest, Password Manager, and ML Deployment Pipeline
4. **Experience** - Professional internships and virtual work experience
5. **Education** - BE in AI & ML from P.A. College of Engineering
6. **Certifications** - IBM Blockchain, Python for Data Science, Cisco Cybersecurity
7. **Contact** - Contact form and social media links
8. **Footer** - Additional links and credits

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/adilsiraju/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       ├── Navigation.tsx
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Projects.tsx
│       ├── Experience.tsx
│       ├── Education.tsx
│       ├── Certifications.tsx
│       ├── Contact.tsx
│       └── Footer.tsx
├── public/
├── package.json
└── README.md
```

## 🎨 Customization

### Colors
The website uses a blue color scheme defined in Tailwind CSS. To change the primary color, update the color classes throughout the components (e.g., `bg-blue-600`, `text-blue-600`, etc.).

### Content
Update the content in each component file to customize:
- Personal information in `Hero.tsx`
- Skills and description in `About.tsx`
- Project details in `Projects.tsx`
- Work experience in `Experience.tsx`
- Education details in `Education.tsx`
- Certifications in `Certifications.tsx`

### Styling
The website uses Tailwind CSS for styling. Modify the classes in each component to change the appearance.

## 📧 Contact Form

The contact form currently uses a mailto link. For a more robust solution, you can integrate with:
- **Formspree** - Simple form handling service
- **Netlify Forms** - If deploying to Netlify
- **EmailJS** - Client-side email service
- **Custom API** - Build your own backend API

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with automatic builds on every push

### Netlify

1. Build the project: `npm run build`
2. Upload the `out` folder to Netlify
3. Configure redirects if needed

### GitHub Pages

1. Add deployment workflow to `.github/workflows/`
2. Configure GitHub Pages in repository settings
3. Push to trigger deployment

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## ⚡ Performance

- **Next.js SSG**: Static site generation for fast loading
- **Image Optimization**: Automatic image optimization with Next.js
- **Code Splitting**: Automatic code splitting for optimal bundle sizes
- **SEO Optimized**: Proper meta tags and structured data

## 🤝 Contributing

This is a personal portfolio, but if you find any bugs or have suggestions for improvements, feel free to open an issue or submit a pull request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 About the Developer

**Mohammed Adil Siraju**
- 🎓 BE in AI & ML Engineering from P.A. College of Engineering
- 🌱 Currently learning advanced ML techniques and cloud technologies
- 💼 Open to opportunities in AI/ML Engineering and Software Development
- 📧 Contact: mohdadilsiraju@gmail.com
- 🌐 GitHub: [adilsiraju](https://github.com/adilsiraju)

---

**Designed and developed with ❤️ by Mohammed Adil Siraju**
