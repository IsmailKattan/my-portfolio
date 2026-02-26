# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Start Development Server
```bash
pnpm dev
```

The app will open at `http://localhost:5173`

### 3. Explore the Features!

Navigate through:
- **Home** - Overview and quick navigation
- **CV** - Personal information and skills
- **Experiences** - Work history
- **Projects** - Portfolio projects with demos
- **Certificates** - Nested certificate structure
- **Blog** - Articles and posts

## 🎨 Key Features to Try

### Language Switching
Click the language switcher (🌐 icon) in the navigation bar to switch between:
- English
- Arabic (with RTL support)
- Turkish

### Dark Mode
Click the sun/moon icon to toggle between light and dark themes.

### Chatbot
Click the floating chat icon in the bottom-right corner to open the support chatbot.

### Project & Blog Filtering
Use the category filters on Projects and Blog pages to filter content by category.

### Certificate Tree
Expand certificate nodes to view sub-certificates and their nested items.

## 🛠️ Customization

### Update Your Information

Edit `/src/data/mockData.ts` to customize:

```typescript
// Personal Info
export const cvData = {
  personalInfo: {
    name: 'Your Name',
    email: 'your.email@example.com',
    // ... more fields
  }
}

// Add your projects
export const projectsData = [
  {
    name: 'Your Project',
    description: 'Project description',
    // ... more fields
  }
]
```

### Change Theme Colors

Edit `/src/styles/theme.css`:

```css
:root {
  --primary: #your-color;
  /* ... more variables */
}
```

### Add Translations

Edit `/src/i18n.ts`:

```typescript
const resources = {
  en: {
    translation: {
      // Add your translations
    }
  }
}
```

## 📱 Responsive Design

The website is fully responsive and tested on:
- Desktop (1920px+)
- Laptop (1280px - 1920px)
- Tablet (768px - 1280px)
- Mobile (320px - 768px)

## 🎯 Next Steps

1. **Replace mock data** with your actual information
2. **Add your images** to the projects and blog posts
3. **Customize colors** to match your brand
4. **Connect real APIs** for the chatbot (optional)
5. **Deploy** to your favorite hosting platform

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is busy:
```bash
pnpm dev -- --port 3000
```

### Clear Cache
```bash
rm -rf node_modules .vite
pnpm install
```

### Build Errors
Ensure you're using Node.js v18+ and the latest pnpm:
```bash
node --version  # Should be v18+
pnpm --version  # Should be latest
```

## 📚 Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [i18next](https://www.i18next.com)
- [Motion](https://motion.dev)

## 💡 Tips

- Use `pnpm dev` for development with hot reload
- Run `pnpm build` before deploying
- Test all languages before going live
- Test both light and dark modes
- Check responsive design on multiple devices

Enjoy building your portfolio! 🎉
