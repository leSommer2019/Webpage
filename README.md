# Personal Webpage - React + Vite + TypeScript

A modern, serverless single-page application built with React, Vite, and TypeScript. Fully DSGVO compliant with no cookies, no tracking, and all data stored locally in the browser.

## 🌟 Features

### 🔗 Social Media Links
- Quick access to YouTube, Instagram, TikTok, Discord, NameMC, and Twitch
- Clean, card-based interface

### 🎮 Browser Games (No Database Required)
- **Tic-Tac-Toe** - Classic 2-player game
- **Snake** - Control the snake with arrow keys
- **Memory** - Match pairs of emoji cards
- **Rock Paper Scissors** - Play against the computer
- **Yahtzee** - Full dice game with scorecard
- **Battleship** - Naval warfare strategy game

### 📝 Blog System
- Create posts with password protection
- Categorize posts by topics: Real Life, Gaming, Coding
- Like/unlike posts (stored locally)
- Filter posts by topic
- All data stored in browser localStorage

### 🌓 Dark Mode
- Automatic theme detection based on system preferences
- Smooth transitions between light and dark modes

### 🌍 Multi-Language Support
- German (default)
- English
- Automatic language detection based on browser settings

### 🔒 Privacy & DSGVO Compliance
- No cookies
- No tracking
- No external analytics
- All data stored locally in browser
- No Impressum required

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173/Webpage/](http://localhost:5173/Webpage/) in your browser.

### Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

## 📦 Deployment

This project is configured for GitHub Pages deployment:

1. Push to the `main` branch
2. GitHub Actions will automatically build and deploy
3. The site will be available at `https://<username>.github.io/Webpage/`

## 🛠️ Technology Stack

- **React 19** - UI framework
- **Vite 7** - Build tool
- **TypeScript** - Type safety
- **CSS Variables** - Theming system
- **localStorage** - Client-side data storage

## 📝 Blog Administration

To add a blog post:

1. Click "Add Post" on the Blog page
2. Enter a password (first time sets the admin password)
3. Fill in title, content, and select a topic
4. Click "Publish"

The admin password is stored in localStorage. To reset it, clear your browser data.

## 🎨 Features Highlights

- **Serverless** - No backend required
- **Responsive** - Works on mobile and desktop
- **Accessible** - Semantic HTML and ARIA labels
- **Fast** - Optimized build with code splitting
- **Offline-ready** - All assets bundled

## 🐛 Console Logging

The application includes helpful console logs for debugging:
- Theme changes
- Language detection
- Game events
- Blog post actions
- Navigation tracking

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
