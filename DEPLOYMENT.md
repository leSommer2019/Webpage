# Deployment Guide

## GitHub Pages Setup

To deploy this application to GitHub Pages:

### 1. Enable GitHub Pages

1. Go to your repository settings
2. Navigate to "Pages" section
3. Under "Build and deployment":
   - Source: Select "GitHub Actions"

### 2. Push to Main Branch

Once you merge this PR to the `main` branch, the GitHub Actions workflow will automatically:
- Install dependencies
- Build the application
- Deploy to GitHub Pages

### 3. Access Your Site

Your site will be available at:
```
https://<your-username>.github.io/Webpage/
```

## Environment Configuration

### Base Path

The application is configured with base path `/Webpage/` in `vite.config.ts`. If you want to deploy to a different path:

1. Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/your-path/',
  // ...
})
```

2. Update the workflow file `.github/workflows/deploy.yml` if needed

### Blog Admin Password

The blog admin password is set on first use:
1. Navigate to the Blog page
2. Click "Add Post"
3. Enter a password (minimum 6 characters)
4. This password is stored in localStorage
5. Use the same password for future posts

To reset the password:
- Clear browser localStorage for your site
- Or use browser DevTools: `localStorage.removeItem('admin_password')`

## Local Development

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Customization

### Social Links

Edit `src/data/links.ts` to customize your social media links:
```typescript
export const socialLinks: SocialLink[] = [
  {
    name: 'YouTube',
    url: 'https://youtube.com/@yourhandle',
    icon: '🎥',
  },
  // Add more links...
];
```

### Theme Colors

Edit CSS variables in `src/index.css`:
```css
:root[data-theme="light"] {
  --accent-color: #0066cc; /* Change this */
  /* ... */
}
```

### Add More Games

1. Create a new game component in `src/games/`
2. Add the game to `src/components/Games.tsx`
3. Add translations in `src/utils/translations.ts`
4. Update the render logic in `src/App.tsx`

## Troubleshooting

### Build Fails
- Check TypeScript errors: `npm run build`
- Verify all dependencies: `npm install`

### Pages Not Loading
- Verify base path in `vite.config.ts` matches your repository name
- Check GitHub Actions logs for deployment errors

### Games Not Working
- Check browser console for errors
- Ensure JavaScript is enabled
- Try a different browser

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Requires localStorage support

## Performance

- First load: ~240KB (gzipped: ~70KB)
- Subsequent loads: Cached
- All assets bundled and optimized
