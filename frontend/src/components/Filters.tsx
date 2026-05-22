import React from 'react';
import { Filter, ArrowUpDown } from 'lucide-react';

type Props = {
  category: string;
  setCategory: (c: string) => void;
  sort: string;
  setSort: (s: string) => void;
};

const CATEGORIES = ['All', 'Groceries', 'Housing', 'Entertainment', 'Utilities', 'Transportation', 'Food', 'Other'];

export const Filters: React.FC<Props> = ({ category, setCategory, sort, setSort }) => {
  return (
    <div className="glass-panel" style={{
      animationDelay: '0.2s',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Category Label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={16} color="var(--primary-color)" />
          <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>Filter by Category</span>
        </div>

        {/* Sort Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <label style={{ 
            fontSize: '0.85rem', 
            color: 'var(--text-secondary)', 
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}>
            <ArrowUpDown size={14} color="var(--primary-color)" />
            <span>Sort by:</span>
          </label>
          <select 
            value={sort} 
            onChange={(e) => setSort(e.target.value)}
            style={{ 
              padding: '0.45rem 1.75rem 0.45rem 0.75rem',
              borderRadius: '10px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              height: '38px'
            }}
          >
            <option value="">Oldest First</option>
            <option value="date_desc">Newest First</option>
          </select>
        </div>
      </div>

      {/* Horizontally Scrollable Chips */}
      <div className="chips-container">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`chip ${category === c ? 'active' : ''}`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
};
