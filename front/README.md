# Cybersecurity Specialist Portfolio Website

A comprehensive, responsive portfolio website for cybersecurity professionals built with React, TypeScript, and Tailwind CSS.

## Features

### 🌐 Multi-Language Support
- **English** (🇬🇧)
- **Arabic** (🇸🇦) with RTL support
- **Turkish** (🇹🇷)
- Powered by i18next for seamless language switching

### 📄 Pages

#### 1. CV Page
- Personal information display
- Education history
- Technical skills showcase
- Professional presentation

#### 2. Experiences Page
- Chronological work history
- Position details
- Company information
- Responsibilities breakdown

#### 3. Projects Page
- Project cards with:
  - Cover images
  - Descriptions
  - Categories and tags
  - Live demo links
  - Repository links
- Category filtering
- Responsive grid layout

#### 4. Certificates Page
- Tree structure with nested certificates
- Support for sub-certificates at multiple levels
- Expandable/collapsible nodes
- Certificate details:
  - Name
  - Issuer
  - Issue date
  - Credential links

#### 5. Blog Page
- Blog post cards with:
  - Cover images
  - Descriptions
  - Categories and tags
  - Author information
  - Publication dates
- Category filtering
- Responsive grid layout

### 💬 Support Chatbot
- Floating chat widget
- Interactive messaging interface
- Positioned in bottom-right corner
- Smooth animations
- Demo responses (ready for integration with real chat API)

### 🎨 UI/UX Features
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: Powered by Motion (Framer Motion)
- **Modern UI**: Clean, professional design with Tailwind CSS
- **Accessibility**: Keyboard navigation and focus states
- **RTL Support**: Full right-to-left layout support for Arabic

## Tech Stack

- **React 18.3.1**: Modern React with hooks
- **TypeScript**: Type-safe code
- **React Router DOM**: Client-side routing
- **i18next**: Internationalization
- **Tailwind CSS 4.x**: Utility-first CSS framework
- **Motion (Framer Motion)**: Animations
- **Lucide React**: Icon library
- **Vite**: Fast build tool

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── blog-card.tsx
│   │   ├── certificate-tree.tsx
│   │   ├── chatbot.tsx
│   │   ├── language-switcher.tsx
│   │   ├── project-card.tsx
│   │   └── theme-toggle.tsx
│   ├── pages/
│   │   ├── blog-page.tsx
│   │   ├── certificates-page.tsx
│   │   ├── cv-page.tsx
│   │   ├── experiences-page.tsx
│   │   ├── home-page.tsx
│   │   └── projects-page.tsx
│   └── App.tsx
├── data/
│   └── mockData.ts
├── styles/
│   ├── custom.css
│   ├── fonts.css
│   ├── index.css
│   ├── tailwind.css
│   └── theme.css
└── i18n.ts
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Start development server:
```bash
pnpm dev
```

3. Build for production:
```bash
pnpm build
```

## Customization

### Adding/Editing Content

All content is stored in `/src/data/mockData.ts`. You can easily modify:
- Personal information
- Work experiences
- Projects
- Certificates
- Blog posts

### Translations

Translations are in `/src/i18n.ts`. To add a new language:
1. Add the language resources
2. Add the language to the `LanguageSwitcher` component
3. Update the i18n configuration

### Styling

The application uses Tailwind CSS with a custom theme defined in `/src/styles/theme.css`. Dark mode colors and other design tokens can be customized there.

## Key Components

### Chatbot
The chatbot component (`/src/app/components/chatbot.tsx`) includes:
- Floating button trigger
- Animated chat window
- Message history
- Input field with send functionality
- Ready for integration with chat APIs

### Certificate Tree
Supports infinite nesting levels with:
- Expandable/collapsible nodes
- Visual hierarchy indicators
- Smooth animations
- Responsive design

### Language Switcher
Dropdown menu with:
- Flag emojis
- Language names in native script
- Active language highlighting

### Theme Toggle
Switch between light and dark modes with:
- Sun/Moon icon
- Persistent preference (localStorage)
- System preference detection

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This is a demo portfolio template. Feel free to use and customize for your own portfolio.

## Future Enhancements

Potential additions:
- Real chatbot API integration
- Blog post detail pages
- Contact form
- Analytics integration
- SEO optimization
- Progressive Web App (PWA) support
- Admin panel for content management

---

Built with ❤️ for cybersecurity professionals
