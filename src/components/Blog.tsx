import React, { useState, useEffect } from 'react';
import { t } from '../utils/translations';
import type { Language } from '../types';
import type { BlogPost } from '../types';
import { initialPosts } from '../data/posts';
import './Blog.css';

interface BlogProps {
  language: Language;
}

const STORAGE_KEY = 'blog_posts';
const LIKES_KEY = 'blog_likes';
const PASSWORD_KEY = 'admin_password';

export const Blog: React.FC<BlogProps> = ({ language }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [showAddPost, setShowAddPost] = useState(false);
  const [password, setPassword] = useState('');
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    topic: 'coding' as BlogPost['topic'],
  });
  const [error, setError] = useState('');

  useEffect(() => {
    // Load posts from localStorage or use initial posts
    const storedPosts = localStorage.getItem(STORAGE_KEY);
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
      console.log('[Blog] Loaded posts from localStorage');
    } else {
      setPosts(initialPosts);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPosts));
    }

    // Load likes
    const storedLikes = localStorage.getItem(LIKES_KEY);
    if (storedLikes) {
      setLikes(JSON.parse(storedLikes));
    }
  }, []);

  const handleLike = (postId: string) => {
    const newLikes = { ...likes };
    const isLiked = newLikes[postId];

    if (isLiked) {
      delete newLikes[postId];
      setPosts(prev =>
        prev.map(post =>
          post.id === postId ? { ...post, likes: Math.max(0, post.likes - 1) } : post
        )
      );
    } else {
      newLikes[postId] = true;
      setPosts(prev =>
        prev.map(post =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      );
    }

    setLikes(newLikes);
    localStorage.setItem(LIKES_KEY, JSON.stringify(newLikes));
    
    // Update posts in localStorage
    const updatedPosts = posts.map(post =>
      post.id === postId
        ? { ...post, likes: isLiked ? Math.max(0, post.likes - 1) : post.likes + 1 }
        : post
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
    
    console.log(`[Blog] Post ${postId} ${isLiked ? 'unliked' : 'liked'}`);
  };

  const handleAddPost = () => {
    // Check password (stored in localStorage, set via environment or first-time setup)
    let storedPassword = localStorage.getItem(PASSWORD_KEY);
    
    // If no password is set, set it with the first password entered
    if (!storedPassword) {
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      localStorage.setItem(PASSWORD_KEY, password);
      storedPassword = password;
      console.log('[Blog] Admin password set');
    }

    if (password !== storedPassword) {
      setError(t('incorrectPassword', language));
      return;
    }

    if (!newPost.title || !newPost.content) {
      setError('Title and content are required');
      return;
    }

    const post: BlogPost = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      topic: newPost.topic,
      date: new Date().toISOString(),
      likes: 0,
    };

    const updatedPosts = [post, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));

    setNewPost({ title: '', content: '', topic: 'coding' });
    setPassword('');
    setShowAddPost(false);
    setError('');
    
    console.log('[Blog] New post added:', post.title);
  };

  const filteredPosts =
    selectedTopic === 'all'
      ? posts
      : posts.filter(post => post.topic === selectedTopic);

  const topics = [
    { id: 'all', label: t('allTopics', language) },
    { id: 'rl', label: t('rlStuff', language) },
    { id: 'gaming', label: t('gaming', language) },
    { id: 'coding', label: t('coding', language) },
  ];

  return (
    <div className="blog">
      <div className="blog-header">
        <h1>{t('myBlog', language)}</h1>
        <button className="add-post-btn" onClick={() => setShowAddPost(!showAddPost)}>
          {showAddPost ? t('cancel', language) : t('addPost', language)}
        </button>
      </div>

      {showAddPost && (
        <div className="add-post-form">
          <h3>{t('addPost', language)}</h3>
          <input
            type="password"
            placeholder={t('adminPassword', language)}
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="form-input"
          />
          <input
            type="text"
            placeholder={t('postTitle', language)}
            value={newPost.title}
            onChange={e => setNewPost({ ...newPost, title: e.target.value })}
            className="form-input"
          />
          <textarea
            placeholder={t('postContent', language)}
            value={newPost.content}
            onChange={e => setNewPost({ ...newPost, content: e.target.value })}
            className="form-textarea"
            rows={5}
          />
          <select
            value={newPost.topic}
            onChange={e => setNewPost({ ...newPost, topic: e.target.value as BlogPost['topic'] })}
            className="form-input"
          >
            <option value="rl">{t('rlStuff', language)}</option>
            <option value="gaming">{t('gaming', language)}</option>
            <option value="coding">{t('coding', language)}</option>
          </select>
          {error && <div className="error-message">{error}</div>}
          <button className="submit-btn" onClick={handleAddPost}>
            {t('publish', language)}
          </button>
        </div>
      )}

      <div className="topic-filter">
        {topics.map(topic => (
          <button
            key={topic.id}
            className={`topic-btn ${selectedTopic === topic.id ? 'active' : ''}`}
            onClick={() => setSelectedTopic(topic.id)}
          >
            {topic.label}
          </button>
        ))}
      </div>

      <div className="posts-list">
        {filteredPosts.length === 0 ? (
          <div className="no-posts">{t('noPostsYet', language)}</div>
        ) : (
          filteredPosts.map(post => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <h2 className="post-title">{post.title}</h2>
                <span className={`post-topic topic-${post.topic}`}>
                  {t(post.topic === 'rl' ? 'rlStuff' : post.topic, language)}
                </span>
              </div>
              <p className="post-content">{post.content}</p>
              <div className="post-footer">
                <span className="post-date">
                  {new Date(post.date).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US')}
                </span>
                <button
                  className={`like-btn ${likes[post.id] ? 'liked' : ''}`}
                  onClick={() => handleLike(post.id)}
                >
                  {likes[post.id] ? '❤️' : '🤍'} {post.likes} {t('likes', language)}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
