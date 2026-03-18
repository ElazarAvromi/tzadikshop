# Tzadik Shop - Self-Hosted E-Commerce Store

Jewish streetwear store with built-in admin dashboard and image manager.

## Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [VS Code](https://code.visualstudio.com/)

### Setup

1. **Open this folder in VS Code**

2. **Open the terminal** (Ctrl+` or Terminal → New Terminal)

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the dev server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:** http://localhost:3000

## Project Structure

```
tzadik-shop/
├── index.html              # Entry HTML file
├── package.json            # Dependencies & scripts
├── vite.config.js          # Vite build config
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Root component (routing between Store/Admin)
│   ├── Store.jsx           # Storefront (homepage, products, cart, contact)
│   ├── Admin.jsx           # Admin dashboard (orders, products, images)
│   ├── ImageUploader.jsx   # Drag & drop image upload component
│   ├── useImageStore.js    # Image storage hook (localStorage)
│   ├── data.js             # Products, orders, navigation data
│   └── styles.css          # Global styles
```

## Features

### Store
- Homepage with hero slider, category cards, featured products
- Product detail pages with image gallery, size/color selectors
- Shopping cart with quantity management
- Category navigation with dropdown menus
- Contact form
- Newsletter signup
- Mobile responsive with hamburger menu

### Admin Dashboard
- **Overview:** Revenue stats, order counts, recent orders
- **Orders:** Search/filter, click for full detail, update status
- **Images:** Upload product images via drag-and-drop or file picker
  - Auto-resizes to 800px max
  - First image = main product image
  - Stored in localStorage (persists across sessions)
  - Search products by name
  - Clear all images option
- **Products:** Full inventory table

## Adding Your Product Images

1. Click **Admin** in the store header
2. Go to the **Images** tab
3. Find your product and drag images onto it (or click "Add")
4. First uploaded image becomes the main image
5. Images appear immediately across the entire store

## Building for Production

```bash
npm run build
```

Output goes to `dist/` folder. Deploy to any static hosting (Netlify, Vercel, your own server).

## Customization

- **Products:** Edit `src/data.js` to add/remove/modify products
- **Orders:** Replace sample orders with your real order system
- **Styling:** Edit `src/styles.css` for global styles
- **Images:** Use the admin image manager or put image URLs directly in `data.js`
