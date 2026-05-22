import React, { useState } from 'react';
import type { CreateExpensePayload } from '../api';
import { PlusCircle, Tag, Calendar, FileText, Sparkles } from 'lucide-react';

type Props = {
  onSubmit: (payload: CreateExpensePayload) => void;
  isLoading: boolean;
};

const CATEGORIES = ['Groceries', 'Housing', 'Entertainment', 'Utilities', 'Transportation', 'Food', 'Other'];

export const ExpenseForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;
    
    onSubmit({
      amount: Math.round(Number(amount) * 100),
      category,
      description,
      date
    });
    
    setAmount('');
    setDescription('');
  };

  return (
    <div className="glass-panel" style={{ 
      animationDelay: '0.1s', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '1.5rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <PlusCircle size={22} color="var(--primary-color)" />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Record a New Expense</h2>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--accent-color)',
          background: 'rgba(139, 92, 246, 0.08)',
          padding: '0.35rem 0.75rem',
          borderRadius: '99px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          <Sparkles size={12} />
          <span>Smart Entry</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.5rem',
        alignItems: 'end'
      }}>
        {/* Amount Field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ 
            fontSize: '0.85rem', 
            color: 'var(--text-secondary)', 
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <span>Amount (₹)</span>
          </label>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <span style={{
              position: 'absolute',
              left: '1rem',
              color: 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '1rem',
              pointerEvents: 'none'
            }}>₹</span>
            <input 
              type="number" 
              step="0.01"
              min="0"
              placeholder="0.00"
              value={amount} 
              onChange={(e) => setAmount(e.target.value)}
              required
              disabled={isLoading}
              style={{ 
                paddingLeft: '2.2rem', 
                width: '100%',
                fontWeight: 600
              }}
            />
          </div>
        </div>
        
        {/* Category Field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ 
            fontSize: '0.85rem', 
            color: 'var(--text-secondary)', 
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <Tag size={14} color="var(--primary-color)" />
            <span>Category</span>
          </label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            disabled={isLoading}
            style={{ width: '100%', cursor: 'pointer' }}
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Date Field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ 
            fontSize: '0.85rem', 
            color: 'var(--text-secondary)', 
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <Calendar size={14} color="var(--primary-color)" />
            <span>Date</span>
          </label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)}
            required
            disabled={isLoading}
            style={{ width: '100%' }}
          />
        </div>

        {/* Description Field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ 
            fontSize: '0.85rem', 
            color: 'var(--text-secondary)', 
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <FileText size={14} color="var(--primary-color)" />
            <span>Description</span>
          </label>
          <input 
            type="text" 
            placeholder="e.g. Weekly organic vegetables"
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
            style={{ width: '100%' }}
          />
        </div>

        {/* Button Field (spans 1 full column or adapts to grid) */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', height: '100%' }}>
          <button 
            type="submit" 
            disabled={isLoading}
            className="premium-btn"
            style={{ width: '100%', height: '45px' }}
          >
            <PlusCircle size={18} />
            <span>{isLoading ? 'Saving...' : 'Add Expense'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
