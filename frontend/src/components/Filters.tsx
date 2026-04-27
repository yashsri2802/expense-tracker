import React from 'react';

type Props = {
  category: string;
  setCategory: (c: string) => void;
  sort: string;
  setSort: (s: string) => void;
};

const CATEGORIES = ['All', 'Groceries', 'Housing', 'Entertainment', 'Utilities', 'Transportation', 'Food', 'Other'];

export const Filters: React.FC<Props> = ({ category, setCategory, sort, setSort }) => {
  return (
    <div className="glass-panel" style={{ padding: '1rem 1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Category:</label>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          style={{ 
            padding: '0.5rem', 
            borderRadius: '6px', 
            border: '1px solid var(--border-color)',
            background: 'var(--bg-color)',
            color: 'var(--text-primary)'
          }}
        >
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Sort by:</label>
        <select 
          value={sort} 
          onChange={(e) => setSort(e.target.value)}
          style={{ 
            padding: '0.5rem', 
            borderRadius: '6px', 
            border: '1px solid var(--border-color)',
            background: 'var(--bg-color)',
            color: 'var(--text-primary)'
          }}
        >
          <option value="">Default (Oldest First)</option>
          <option value="date_desc">Newest First</option>
        </select>
      </div>
    </div>
  );
};
