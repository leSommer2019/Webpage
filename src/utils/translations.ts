import type { Translations } from '../types';

export const translations: Translations = {
  de: {
    // Navigation
    home: 'Startseite',
    links: 'Links',
    games: 'Spiele',
    blog: 'Blog',
    
    // Home
    welcome: 'Willkommen',
    welcomeText: 'Entdecke meine Links, spiele Browserspiele und lese meine Blogbeiträge!',
    
    // Links
    myLinks: 'Meine Links',
    socialMedia: 'Social Media',
    
    // Games
    browserGames: 'Browser-Spiele',
    playNow: 'Jetzt spielen',
    backToGames: 'Zurück zu Spielen',
    ticTacToe: 'Tic-Tac-Toe',
    snake: 'Snake',
    memory: 'Memory',
    rockPaperScissors: 'Schere-Stein-Papier',
    yahtzee: 'Yahtzee',
    battleship: 'Schiffe versenken',
    
    // Blog
    myBlog: 'Mein Blog',
    allTopics: 'Alle Themen',
    rlStuff: 'Real Life',
    gaming: 'Gaming',
    coding: 'Coding',
    likes: 'Gefällt mir',
    like: 'Gefällt mir',
    noPostsYet: 'Noch keine Beiträge vorhanden',
    addPost: 'Beitrag hinzufügen',
    adminPassword: 'Admin-Passwort',
    postTitle: 'Titel',
    postContent: 'Inhalt',
    selectTopic: 'Thema auswählen',
    publish: 'Veröffentlichen',
    cancel: 'Abbrechen',
    incorrectPassword: 'Falsches Passwort',
    
    // Privacy
    privacyNotice: 'Diese Website verwendet keine Cookies und erfasst keine persönlichen Daten. Alle Daten werden lokal in Ihrem Browser gespeichert.',
    
    // General
    error: 'Fehler',
    success: 'Erfolg',
  },
  en: {
    // Navigation
    home: 'Home',
    links: 'Links',
    games: 'Games',
    blog: 'Blog',
    
    // Home
    welcome: 'Welcome',
    welcomeText: 'Discover my links, play browser games, and read my blog posts!',
    
    // Links
    myLinks: 'My Links',
    socialMedia: 'Social Media',
    
    // Games
    browserGames: 'Browser Games',
    playNow: 'Play Now',
    backToGames: 'Back to Games',
    ticTacToe: 'Tic-Tac-Toe',
    snake: 'Snake',
    memory: 'Memory',
    rockPaperScissors: 'Rock Paper Scissors',
    yahtzee: 'Yahtzee',
    battleship: 'Battleship',
    
    // Blog
    myBlog: 'My Blog',
    allTopics: 'All Topics',
    rlStuff: 'Real Life',
    gaming: 'Gaming',
    coding: 'Coding',
    likes: 'Likes',
    like: 'Like',
    noPostsYet: 'No posts yet',
    addPost: 'Add Post',
    adminPassword: 'Admin Password',
    postTitle: 'Title',
    postContent: 'Content',
    selectTopic: 'Select Topic',
    publish: 'Publish',
    cancel: 'Cancel',
    incorrectPassword: 'Incorrect Password',
    
    // Privacy
    privacyNotice: 'This website does not use cookies and does not collect personal data. All data is stored locally in your browser.',
    
    // General
    error: 'Error',
    success: 'Success',
  },
};

export const t = (key: string, lang: string): string => {
  return translations[lang]?.[key] || translations['de'][key] || key;
};
