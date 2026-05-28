import React, { useState, useEffect } from 'react';
import { Wallet, Sun, Moon } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light'; // Default to light mode as requested
  });

  useEffect(() => {
    const body = document.body;
    if (theme === 'dark') {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div style={{ 
      padding: 'var(--layout-padding)', 
      maxWidth: '1200px', 
      width: '100%',
      boxSizing: 'border-box',
      margin: '0 auto',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    }}>
      <header className="app-header" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '1.5rem',
        borderBottom: '1px solid var(--border-color)',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)',
            padding: '0.85rem',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px -6px rgba(99, 102, 241, 0.4)',
            transform: 'rotate(-3deg)'
          }}>
            <Wallet color="white" size={28} />
          </div>
          <div>
            <h1 style={{ 
              fontSize: 'var(--header-font-size)', 
              fontWeight: 800, 
              letterSpacing: '-0.03em', 
              background: 'linear-gradient(to right, var(--text-primary), var(--primary-color))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.2rem'
            }}>
              Fenmo AI
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--header-subtitle-size)', fontWeight: 500 }}>
              Gain absolute clarity over your financial flow.
            </p>
          </div>
        </div>

        <div className="theme-toggle-container">
          <button 
            className="theme-btn" 
            onClick={toggleTheme} 
            aria-label="Toggle Theme"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            <span className="theme-btn-slider">
              {theme === 'light' ? (
                <Sun size={12} fill="currentColor" className="theme-icon-sun" />
              ) : (
                <Moon size={12} fill="currentColor" className="theme-icon-moon" />
              )}
            </span>
            <Sun size={14} className="theme-icon-sun" />
            <Moon size={14} className="theme-icon-moon" />
          </button>
        </div>
      </header>

      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </main>

      <footer style={{
        marginTop: 'auto',
        paddingTop: '2rem',
        borderTop: '1px solid var(--border-color)',
        textAlign: 'center',
        color: 'var(--text-secondary)',
        fontSize: '0.85rem',
        fontWeight: 500
      }}>
        <p>&copy; {new Date().getFullYear()} Fenmo AI Expense Tracker. Crafted for financial peace.</p>
      </footer>
    </div>
  );
};
