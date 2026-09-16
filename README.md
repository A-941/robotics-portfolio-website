# ⚡ Robotics & Embedded AI Learning Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-15%20(App%20Router)-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Arduino](https://img.shields.io/badge/Hardware-Arduino_Uno_R3-00979D?style=flat&logo=arduino)](https://www.arduino.cc/)
[![Author](https://img.shields.io/badge/Author-Dhruv_Makwana-blue.svg)](https://github.com/A-941)

A fast, interactive, dark-themed portfolio website documenting Dhruv Makwana's journey learning hardware engineering, embedded systems, and robotics from the ground up alongside computer science and AI/ML studies.

Built not only as a personal portfolio, but as an open, accessible reference guide for fellow ECE and robotics beginners.

---

## 🌟 Key Features

- **Tinkercad-Style Breadboard Layouts**: Realistic, high-definition circuit diagrams showing physical breadboard wiring, colored jumpers, and component orientations (zoomable full-screen).
- **Inline Video Demonstrations**: High-efficiency compressed MP4 recordings of physical hardware runs.
- **Circuit Mathematics & Theory**: Rigorous technical explanations including Ohm's Law resistor derivations and 16-row 4-bit binary truth tables with bitwise operators.
- **Syntax-Highlighted Arduino C++**: Line-numbered firmware code blocks with one-click clipboard copying.
- **Tips for Beginners**: Practical callouts highlighting common wiring mistakes (LED polarity, ungrounded rails, current division).
- **Interactive Roadmap**: 4-phase trajectory from digital fundamentals to autonomous edge-AI rovers.
- **Responsive Engineering Aesthetic**: Mobile-first dark theme, responsive navigation drawer, and sub-second page loads.

---

## 📂 Project Architecture

```
robotics-portfolio-website/
├── public/
│   ├── images/              # Breadboard diagrams, banner, thumbnails
│   ├── videos/              # Compressed video recordings (720p H.264)
│   └── favicon.png          # Geometric circuit favicon
├── src/
│   ├── app/
│   │   ├── layout.tsx       # SEO metadata, Inter font, dark root layout
│   │   ├── page.tsx         # Home page (Hero, Projects grid, Skills, Roadmap)
│   │   ├── about/page.tsx   # Background, motivation, dual purpose
│   │   └── projects/
│   │       ├── page.tsx     # Redirect to projects section
│   │       └── [id]/page.tsx# Static Site Generated (SSG) project details
│   ├── components/
│   │   ├── Navbar.tsx       # Sticky blur nav with mobile drawer
│   │   ├── Footer.tsx       # Bio, navigation, GitHub & contact
│   │   ├── CircuitViewer.tsx# Interactive modal circuit lightbox
│   │   ├── VideoPlayer.tsx  # Responsive HTML5 video player
│   │   ├── CodeBlock.tsx    # Syntax-highlighted C++ code block
│   │   ├── ProjectCard.tsx  # Project grid card with hover zoom
│   │   ├── SkillsSection.tsx# Categorized competency badges
│   │   └── RoadmapSection.tsx # Future project milestone timeline
│   └── data/
│       └── projectsData.ts  # Scalable schema for all projects
```

---

## 🛠️ Local Development

Ensure you have **Node.js 18+** installed.

```bash
# Clone the repository
git clone https://github.com/A-941/robotics-portfolio-website.git
cd robotics-portfolio-website

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build optimized static production bundle
npm run build

# Preview production build locally
npm run start
```

---

## 👤 Author

- **Dhruv Makwana** — 2nd-Year Computer Science Student
- **GitHub**: [@A-941](https://github.com/A-941)
- **Email**: [dhruv.makwana.dev@gmail.com](mailto:dhruv.makwana.dev@gmail.com)
- **LinkedIn**: [Add your LinkedIn here]
